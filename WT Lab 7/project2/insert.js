const mongoose = require("mongoose");
const Book = require("./models/book");
mongoose.connect("mongodb://127.0.0.1:27017/bookDB");
Book.insertMany([
{
    title:"JavaScript Essentials",
    author:"John Smith",
    category:"Programming",
    price:450,
    rating:4.5,
    year:2023
},
{
    title:"Python Basics",
    author:"Mike Brown",
    category:"Programming",
    price:400,
    rating:4.2,
    year:2022
},
{
    title:"MongoDB Mastery",
    author:"David Clark",
    category:"Database",
    price:500,
    rating:4.6,
    year:2023
},
{
    title:"Data Science Guide",
    author:"Anna Lee",
    category:"Data Science",
    price:550,
    rating:4.8,
    year:2024
}
]).then(()=>console.log("Books inserted"));