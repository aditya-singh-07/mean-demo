const express= require('express');
const { route } = require('../app');
const router=express.Router();
const Post=require('../models/post');
const multer=require('multer');
const { count } = require('../models/post');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
//multer images store
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

//post route
router.post("",multer({storage:storage}).single('image'),(req,res,next) =>{
  const url= req.protocol + "://" +  req.get('host');

  const post=new Post({
    title: req.body.title,
    description:req.body.description,
    comment:req.body.comment,
    imagepath: url + '/image/' + req.file.filename
  });
  post.save().then(postdata =>{
    console.log(post);
    res.status(201).json({
      message:"Successfully added",
      post:{
        ...postdata,
        pid:postdata._id
      }
    });
  });
  });

router.get("",(req,res, next) =>{
  let postdata;
  const pagesize=+req.query.pagesize;
  const currentpage=+req.query.page;
  const postquery=Post.find();
  if(pagesize && currentpage){
    postquery.skip(pagesize * (currentpage -1)).limit(pagesize)
  }
  postquery.then(post =>{
     //console.log(post);
     postdata=post;
     return Post.count()
     }).then(count=>{
      res.status(200).json({
        message: "Successfully fetched",
        All_Posts:postdata,
        maxposts:count
     });
   });
  });
router.put("/:id", multer({storage:storage}).single('image'), (req,res,next) =>{
let imagepath=req.body.imagepath;
  if(req.file){
     const url_update= req.protocol + "://" +  req.get('host')
     imagepath= url_update + '/image/' + req.file.filename
  }
    const post=new Post({
      _id:req.body.id,
      title: req.body.title,
      description:req.body.description,
      comment:req.body.comment,
      imagepath:imagepath
    });
    console.log(post)
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
