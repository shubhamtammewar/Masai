const express= require('express');
const books=require('./bookdata');
const app= express();
app.use(express.json());
const logger=(req,res,next)=>{
  req.name="Shubham Tammewar";

      next();
}

app.get("/",logger,(req,res)=>{
    var api_requested_by=req.name;
    res.send({api_requested_by,books});
})

app.post("/books",logger,(req,res)=>{
    var api_requested_by=req.name;
    const new_book=[...books,req.body];
    res.send({api_requested_by,new_book});
    
})

app.get("/books/:id",logger,(req,res)=>{
  let m=Number(req.params.id);

var api_requested_by=req.name;
  const final=books.map((book)=>{
    
    if (m===book.id) {
        res.send({api_requested_by,book});
    }
})
})




app.patch("/books/:id",logger,(req,res)=>{
var api_requested_by=req.name;

  const Books=books.map((entity)=>{
      let out=Number(req.params.id);

         if (out===entity.id) {
              if (req?.body?.id) entity.id=req.body.id;
              if (req?.body?.author) entity.author=req.body.author;
              if (req?.body?.book_name) entity.book_name=req.body.book_name;
              if (req?.body?.pages) entity.pages=req.body.pages;
              if (req?.body?.published_year) entity.published_year=req.body.published_year;

         } 
      return entity;
  });
  res.send({api_requested_by,Books});
    
})


app.delete("/books/:id",logger,(req,res)=>{
    let b=Number(req.params.id);
    var api_requested_by=req.name;

    const Books=books.filter((s)=>b!==s.id);
  res.send({api_requested_by,Books});
    
    
})

app.listen(1235,function(){
    console.log("received response");
})