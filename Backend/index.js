require('dotenv').config(); // load .env at the top
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');
const port=4000;

require('./db/connection');

const ProductModel = require('./models/Product');
const UserModel=require('./models/Users');

const { sourceMapsEnabled } = require('process');


app.use(express.json());
app.use(cors());

//API Creation
app.get("/", (req, res) => {
  res.send("Backend is working ");
});
//Image Storage
const storage=multer.diskStorage({
  destination:'./upload/image',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})
//Image upload

const upload=multer({storage:storage})

//Creating Upload Endpoint for images
app.use('/images' ,express.static('upload/image'))
app.post("/upload" ,upload.single('product'),(req,res)=>{
    res.json({
      success:1,
      image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//to use the model

app.post('/addProduct' , async(req,res)=>{
  let products=await ProductModel.find({});
  let id;
  if(products.length>0){
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id=last_product.id+1;

  }else{
    id=1;
  }
    const product=new ProductModel({
      id:id,
      name:req.body.name,
      image:req.body.image,
      category:req.body.category,
      new_price:req.body.new_price,
      old_price:req.body.old_price,

  })

    console.log(product);
    await product.save(); //store in database
    console.log("Product Saved");
    res.json({
      success:1,
      name:req.body.name,
    })
})


//Creating API For Deleting Products
app.post('/removeProduct' ,async(req,res)=>{
  await ProductModel.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success:1,
    name:req.body.name,
  })
})

//Creating API for Getting All Products
app.get('/allProducts' ,async(req,res)=>{
   const products= await ProductModel.find({});
   console.log("All Products Fetched");
   res.send(products);
})

//Creating API for registering the user

app.post('/signup' ,async(req,res)=>{
  let check=await UserModel.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({
      success:false,
      errors:"Existing User Found with same email address"
    })

  }

    let cart={};
     for (let i = 0; i < 300; i++) {
        cart[i]=0;

     }

     const user=new UserModel({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
     })
//save that created user in the database
     await user.save();

     const data={
      user:{
        id:user.id
        }
     }
 //creating token for users who will get themselves Registered
     const token=jwt.sign(data,'secret_ecom');
     res.json({
      success:true,
      token
     })
    

})

//creating end point for userLogin

app.post('/login',async(req,res)=>{
  let user=await UserModel.findOne({email:req.body.email});
  if(user){
    const passCompare=req.body.password === user.password;
    if(passCompare){
      const data={
        user:{
          id:user.id
        }
      }

      const token=jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else{
      res.json({
        success:false,
        errors:"Wrong Password"
      });
    }
  }

  else {
    res.json({success:false,errors:"Wrong Email Id"});
  }

})

//Creating end point for collection data

app.get('/newcollections' ,async(req,res)=>{
    let products=await ProductModel.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("New Collection fetched");
    res.send(newcollection);
    

})

//creating end point for popular in women category

app.get('/popularinwomen',async(req,res)=>{
    let products=await ProductModel.find({category:"women"});
    let popular_in_Women=products.slice(0,4);
    console.log("Popular In Women Fetched");
    res.send(popular_in_Women);
    

})

//creating middleware to fetch a user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token." });
  }

  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next(); 
  } catch (error) {
    res.status(401).send({ errors: "Invalid token." });
  }
};


//creating API (end point) for adding products which user select and show in cart in database
app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await UserModel.findOne({ _id: req.user.id });
   console.log("Added:", req.user.id);

  // Safely increment cart count
  if (!userData.cartData[req.body.itemId]) {
    userData.cartData[req.body.itemId] = 1;
  } else {
    userData.cartData[req.body.itemId] += 1;
  }
  // Correct model call
  await UserModel.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

  res.send("Added!");
});


//creating endpoint to remove the product from Cart in datbase
app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await UserModel.findById(req.user.id);

  const itemId = req.body.itemId;
  console.log("Removed:",itemId);

  // If item exists and quantity > 0, decrement
  if (userData.cartData[itemId] && userData.cartData[itemId] > 0) {
    userData.cartData[itemId] -= 1;
  } else {
    userData.cartData[itemId] = 0; // make sure it never goes negative
  }

  await UserModel.findByIdAndUpdate(req.user.id, {
    cartData: userData.cartData,
  });

  res.send("Removed!");
});

//creating  endpoint to get cartdata of the user who is loggin or ever added anything in cart...
app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("Get Cart");
  let userData=await UserModel.findOne({_id:req.user.id});
  res.json(userData.cartData);

})

app.listen((port) ,()=>{
    console.log(`Listening on port ${port}`);
});