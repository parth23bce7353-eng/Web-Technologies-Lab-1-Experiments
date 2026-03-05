const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/bookDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


app.get("/", async (req,res)=>{
    const books = await Book.find();
    res.render("index",{books:books});
});


app.get("/search", async (req,res)=>{
    const title = req.query.title;
    const books = await Book.find({
        title:{$regex:title,$options:"i"}
    });
    res.render("index",{books:books});
});


app.get("/category/:cat", async (req,res)=>{
    const books = await Book.find({category:req.params.cat});
    res.render("index",{books:books});
});


app.get("/sort/price", async (req,res)=>{
    const books = await Book.find().sort({price:1});
    res.render("index",{books:books});
});


app.get("/sort/rating", async (req,res)=>{
    const books = await Book.find().sort({rating:-1});
    res.render("index",{books:books});
});


app.get("/top", async (req,res)=>{
    const books = await Book.find({rating:{$gte:4}})
    .limit(5);
    res.render("index",{books:books});
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});