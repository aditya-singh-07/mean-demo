const mongoose=require('mongoose')
const postschema=mongoose.Schema({
  title: {type: String, required:true},
  description: {type: String,required:true},
  comment: {type: String,required:true},
  imagepath: {type:String,required:true}
});

module.exports=mongoose.model('post',postschema);
