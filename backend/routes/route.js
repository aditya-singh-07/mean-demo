const express= require('express');
const { route } = require('../app');
const router=express.Router();
const Post=require('../models/post');

router.post("",(req,res,next) =>{
  const post=new Post({
    title: req.body.title,
    description:req.body.description,
    comment:req.body.comment,
  });
  post.save().then(postdata =>{
    console.log(post);
    res.status(201).json({
      message:"Successfully added",
      pid:postdata._id
    });
  });
  });

router.get("",(req,res, next) =>{
   Post.find().then(post =>{
     //console.log(post);
      res.status(200).json({
      message: "Successfully fetched",
      All_Posts:post
     });
   });

  });
router.put("/:id", (req,res,next) =>{
    const post=new Post({
      _id:req.body.id,
      title: req.body.title,
      description:req.body.description,
      comment:req.body.comment
    });
    Post.updateOne({_id:req.params.id}, post).then((result) =>{
      console.log(result);
      res.status(200).json({
        message:"update success"
      });

    });
  });

router.get("/:id",(req,res,next) =>{
    Post.findById(req.params.id).then(posts =>{
      if(posts){
        res.status(200).json(posts);
      }else{
        res.status(404).json({
          message:"Not found",
        });
      }
    });
  });

router.delete("/:id", (req,res) =>{
    //console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then(result =>{
      // console.log(res);
      res.status(200).json({
        message:"deleted success"
      });
    });
  });

module.exports=router;
