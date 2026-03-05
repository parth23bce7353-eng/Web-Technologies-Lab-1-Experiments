const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "library";
let db;

async function connectDB(){
    await client.connect();
    db = client.db(dbName);
}

connectDB();

// 1 Search by title
app.get("/books/search", async (req,res)=>{
    const title=req.query.title;
    const books=await db.collection("books")
    .find({title:{$regex:title,$options:"i"}})
    .toArray();
    res.json(books);
});

// 2 Filter by category
app.get("/books/category/:category", async (req,res)=>{
    const books=await db.collection("books")
    .find({category:req.params.category})
    .toArray();
    res.json(books);
});

// 3 Sort by price
app.get("/books/sort/price", async (req,res)=>{
    const books=await db.collection("books")
    .find()
    .sort({price:1})
    .toArray();
    res.json(books);
});

// 4 Sort by rating
app.get("/books/sort/rating", async (req,res)=>{
    const books=await db.collection("books")
    .find()
    .sort({rating:-1})
    .toArray();
    res.json(books);
});

// 5 Top rated books
app.get("/books/top", async (req,res)=>{
    const books=await db.collection("books")
    .find({rating:{$gte:4}})
    .limit(5)
    .toArray();
    res.json(books);
});

// 6 Pagination
app.get("/books", async (req,res)=>{
    const page=parseInt(req.query.page)||1;
    const limit=5;
    const skip=(page-1)*limit;
    const books=await db.collection("books")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
    res.json(books);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});