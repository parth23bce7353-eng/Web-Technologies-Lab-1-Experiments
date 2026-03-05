const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./noteModel");
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/studentNotes");

// Add Note
app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.send("Note Added");
});

// View Notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Update Note
app.put("/notes/:id", async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.send("Note Updated");
});

// Delete Note
app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send("Note Deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});