const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userschema=mongoose.Schema({
  email: {type: String, required:true,unique:true},
  username: {type: String, required:true},
  password: {type: String,required:true},
});

userschema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userschema);
