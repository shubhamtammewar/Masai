const express = require('express');
const user=require('./users.json');
const app = express();
app.use(express.json())
app.get("/",(req,res)=>{
    // console.log("ready");
    res.send("Welcome to Home Page");
})

app.listen(2345,function () {
    console.log("listening on port 2345");
    // res.send("welcome")
})



