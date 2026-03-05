const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
 title: String,
 subject: String,
 description: String,
 created_date: {
   type: Date,
   default: Date.now
 }
});

module.exports = mongoose.model("Note", noteSchema);