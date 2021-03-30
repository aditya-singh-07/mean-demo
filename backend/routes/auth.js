const express= require('express');
const User = require('../models/user');
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const PRIVATEKEY="hello"

router.post("/signup",(req,res,next) =>{
    bcrypt.hash(req.body.password,10).then(hash =>{
      const user=new User({
        email:req.body.email,
        username:req.body.username,
        password:hash
      });
        user.save().then(result=>{
          res.status(201).json({
            message:"Success",
            result:result
          });
        }).catch(err =>{
          res.status(500).json({
          error:err,
          });
          });
      });
});

router.post("/login", (req,res,next) =>{
  let fetchuserid;
  User.findOne({email:req.body.email}).then(user =>{
    fetchuserid=user;
    if(!user){
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    bcrypt.compare(req.body.password, user.password).then(result => {
    if(!result){
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    const token=jwt.sign({email:fetchuserid.email,userid:fetchuserid._id},PRIVATEKEY,{expiresIn: "1h"});
    res.status(200).json({
      token:token,
      expireIn: 3600
    });
  }).catch(err =>{
    res.status(401).json({
      message: "Auth Failed"
    });
  });

  })
});

module.exports=router;
