const jwt=require('jsonwebtoken')
const config=require('../config/build.config')
const PRIVATEKEY = "hello"
module.exports=(req,res,next) =>{
  try{
    const token =req.headers.authorization.split(" ")[1];
    jwt.verify(token,PRIVATEKEY);
    next()
  }catch(err){
    res.status(401).json({
      message:"Failed Auth"
    });
  }
}
