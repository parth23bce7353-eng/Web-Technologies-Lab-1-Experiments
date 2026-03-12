const student = {
    id: 111,
    name: "Parth",
    department: "CSE",
    marks: 67,
};

const{id,name,department,marks} = student;
let studentGrade = marks >= 90 ? "A" : marks >= 80 ? "B" : marks >= 70 ? "c" : marks >= 60 ? "D" : marks >= 50 ? "E" : "F";

console.log(id,name,department,marks);
const updateStudent = {
    ...student,
    grade: studentGrade
};
console.log(updateStudent);
