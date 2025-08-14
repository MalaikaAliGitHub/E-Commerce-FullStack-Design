const mongoose=require('mongoose');

//Database Connection with MongoDB
mongoose.connect("mongodb://localhost:27017/E-Commerce").then( console.log("Connection Established :) ")).catch( (e)=>{
   console.log(e);
})
