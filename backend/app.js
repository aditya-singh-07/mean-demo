const express=require('express');
const mongoose=require('mongoose');
const app = express();
const route=require('../backend/routes/route')
const path=require('path')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://aditya:aditya@cluster0.oj6iy.mongodb.net/mean-demo?retryWrites=true&w=majority')
.then(() =>{
  console.log("connected successfully");
}).catch(() =>{
  console.log("connected unsuccessfully");
});

const bodyparser= require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use('/image', express.static(path.join("backend/images")));
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
res.setHeader('Access-Control-Allow-Methods','POST,PUT,PATCH,DELETE,GET,OPTIONS');
next();
});

app.use("/posts", route)
module.exports=app;
