const express = require('express');
const mongoose = require('mongoose');
const user=require('../expressapp/sh.json');
const app = express();
app.use(express.json());
/* 
1-connect to mongodb server 
2-craete a Schema for our data i.e. blue print of our data or like constructor function returning as objectIdSymbol
3-create model from the schema(as this model basically inserting or creating these objects on databases)
*/

const connect=() =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/movie")
}
// #blue print or mould of data format
const UserSchema=new mongoose.Schema({
     id:{type:"number",required: true,unique: true },
     movie_name:{type:"string",required: true,unique: true},
     movie_genre:{type:"string",required: true},
     production_year:{type:"number",required: true},
     budget:{type:"number",required: true}
},
     {versionKey:false,
    timestamps:true,}
);
// step-3 (if already collection is present over their in that case is ok in either case it will take the collection name as singular and make it plural and its documents are look like a UserSchema)
const User=mongoose.model("user",UserSchema);
/*
user
post =/user
get all=/user
get one=/user/:id
update one=user/:id
delete one=user/:id
*/
app.post("/user",async(req,res)=>{
  try {
    const user= await User.create(req.body)
   
    res.status(201).send(user);
  } catch (e) {                                  /*exception case*/ 
      res.status(500).json({message: e.message});
  }
})
app.get("/user",async (req,res)=>{
try {
    const us=await User.find().lean().exec();
    res.send({us});
} catch (e) {
   res.send({error: e});
}
})
app.get("/user/:id",async (req,res)=>{
  try {
    const usa=await User.findById(req.params.id).lean().exec();
    res.send({usa});
  } catch (e) {
      res.send(e);
  }
})
app.patch("/user/:id",async (req,res)=>{
  try {
    const usb=await User.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
    }).lean().exec();
    return res.status(201).send(usb);
  } catch (e) {
    return res.status(500).json({message: e.message,status:"Failed"});
  }
})
app.delete("/user/:id",async (req,res)=>{
  try {
    const usc=await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send(usc);
  } catch (e) {
    return res.status(500).json({message: e.message,status:"Failed"});
  }
})
app.listen(3456,async () => {
    await connect();
    console.log('listening on port 3456');
})

