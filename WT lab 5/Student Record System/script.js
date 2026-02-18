let students = [];

function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();  // Parse JSON
        })
        .then(data => {
            students = data;
            displayStudents();
            showMessage("Students loaded successfully!", false);
        })
        .catch(error => {
            showMessage("Error loading or parsing JSON file!", true);
            console.error(error);
        });
}

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Marks</th>
        </tr>
    `;
    if (students.length === 0) {
        showMessage("No students found!", true);
        return;
    }
    students.forEach(student => {
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = student.id;
        row.insertCell(1).innerHTML = student.name;
        row.insertCell(2).innerHTML = student.course;
        row.insertCell(3).innerHTML = student.marks;
    });
}

function validateInputs(requireAll = true) {
    let id = document.getElementById("studentId").value.trim();
    let name = document.getElementById("studentName").value.trim();
    let course = document.getElementById("studentCourse").value.trim();
    let marks = document.getElementById("studentMarks").value.trim();
    if (!id) {
        showMessage("Student ID is required!", true);
        return false;
    }
    if (requireAll && (!name || !course || !marks)) {
        showMessage("All fields are required!", true);
        return false;
    }
    if (marks && (marks < 0 || marks > 100)) {
        showMessage("Marks must be between 0 and 100!", true);
        return false;
    }
    return true;
}

function addStudent() {
    if (!validateInputs()) return;
    let id = parseInt(document.getElementById("studentId").value);
    if (students.some(student => student.id === id)) {
        showMessage("Student ID already exists!", true);
        return;
    }
    let newStudent = {
        id: id,
        name: document.getElementById("studentName").value,
        course: document.getElementById("studentCourse").value,
        marks: parseInt(document.getElementById("studentMarks").value)
    };
    students.push(newStudent);
    displayStudents();
    showMessage("Student added successfully!", false);
}

function updateStudent() {
    if (!validateInputs(false)) return;
    let id = parseInt(document.getElementById("studentId").value);
    let student = students.find(s => s.id === id);
    if (!student) {
        showMessage("Student not found!", true);
        return;
    }
    let newCourse = document.getElementById("studentCourse").value;
    let newMarks = document.getElementById("studentMarks").value;
    if (newCourse) student.course = newCourse;
    if (newMarks) {
        if (newMarks < 0 || newMarks > 100) {
            showMessage("Marks must be between 0 and 100!", true);
            return;
        }
        student.marks = parseInt(newMarks);
    }
    displayStudents();
    showMessage("Student updated successfully!", false);
}

function deleteStudent() {
    if (!validateInputs(false)) return;
    let id = parseInt(document.getElementById("studentId").value);
    let index = students.findIndex(s => s.id === id);
    if (index === -1) {
        showMessage("Student not found!", true);
        return;
    }
    students.splice(index, 1);
    displayStudents();
    showMessage("Student deleted successfully!", false);
}

function showMessage(msg, isError) {
    let message = document.getElementById("message");
    message.innerHTML = msg;
    message.style.color = isError ? "red" : "green";
}
