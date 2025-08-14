const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
     name:{
        type:String,
     },
     email:{
        type:String,
        unique:true
     },
     password:{
        type:String,
     },
     cartData:{
        type:Object,
        
     },
     date:{
        type:Date,
        default:Date.now,
     }
})

const UserModel=new mongoose.model("UserModel" ,UserSchema);
module.exports = UserModel;
