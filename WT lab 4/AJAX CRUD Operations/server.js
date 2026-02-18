const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let students = [];
app.post("/students", (req, res) => {
    const student = req.body;
    if (students.find(s => s.id === student.id)) {
        return res.status(500).json({ message: "Student ID already exists" });
    }
    students.push(student);
    res.status(200).json({ message: "Student added successfully" });
});
app.get("/students", (req, res) => {
    res.status(200).json(students);
});
app.put("/students/:id", (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students[index] = req.body;
    res.status(200).json({ message: "Student updated successfully" });
});
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }
    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
