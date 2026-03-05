const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Note = require("./models/Note");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://127.0.0.1:27017/studentNotes");


app.get("/", async(req,res)=>{
    const notes = await Note.find();
    res.render("index",{notes});
});


app.get("/add",(req,res)=>{
    res.render("add");
});


app.post("/notes", async(req,res)=>{
    await Note.create(req.body);
    res.redirect("/");
});


app.get("/edit/:id", async(req,res)=>{
    const note = await Note.findById(req.params.id);
    res.render("edit",{note});
});


app.put("/notes/:id", async(req,res)=>{
    await Note.findByIdAndUpdate(req.params.id,req.body);
    res.redirect("/");
});


app.delete("/notes/:id", async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});