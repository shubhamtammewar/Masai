const express = require('express');
const user1=require('./users.json');
const app1= express();
app1.use(express.json())

app1.get("",(req,res)=>{
    // console.log("ready");
    res.send({user1});
})
app1.listen(2346,function () {
    console.log("listening on port 2346");
    // res.send("welcome")
})



