let xmlDoc = null;

function loadEmployees() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xmlDoc = xhr.responseXML;
                if (!xmlDoc) {
                    showMessage("Malformed XML file!", true);
                    return;
                }
                displayEmployees();
                showMessage("Employees loaded successfully!", false);
            } else {
                showMessage("Error loading XML file!", true);
            }
        }
    };
    xhr.send();
}

function displayEmployees() {
    let table = document.getElementById("empTable");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
        </tr>
    `;
    let employees = xmlDoc.getElementsByTagName("employee");
    if (employees.length === 0) {
        showMessage("No employees found!", true);
        return;
    }
    for (let i = 0; i < employees.length; i++) {
        let id = employees[i].getElementsByTagName("id")[0].textContent;
        let name = employees[i].getElementsByTagName("name")[0].textContent;
        let dept = employees[i].getElementsByTagName("department")[0].textContent;
        let salary = employees[i].getElementsByTagName("salary")[0].textContent;
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = dept;
        row.insertCell(3).innerHTML = salary;
    }
}

function addEmployee() {
    if (!xmlDoc) {
        showMessage("Load XML first!", true);
        return;
    }
    let id = document.getElementById("empId").value;
    let name = document.getElementById("empName").value;
    let dept = document.getElementById("empDept").value;
    let salary = document.getElementById("empSalary").value;
    if (!id || !name || !dept || !salary) {
        showMessage("All fields are required!", true);
        return;
    }
    let employee = xmlDoc.createElement("employee");
    let idNode = xmlDoc.createElement("id");
    idNode.appendChild(xmlDoc.createTextNode(id));
    let nameNode = xmlDoc.createElement("name");
    nameNode.appendChild(xmlDoc.createTextNode(name));
    let deptNode = xmlDoc.createElement("department");
    deptNode.appendChild(xmlDoc.createTextNode(dept));
    let salaryNode = xmlDoc.createElement("salary");
    salaryNode.appendChild(xmlDoc.createTextNode(salary));
    employee.appendChild(idNode);
    employee.appendChild(nameNode);
    employee.appendChild(deptNode);
    employee.appendChild(salaryNode);
    xmlDoc.getElementsByTagName("employees")[0].appendChild(employee);
    displayEmployees();
    showMessage("Employee added successfully!", false);
}

function updateEmployee() {
    let id = document.getElementById("empId").value;
    let employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        let empId = employees[i].getElementsByTagName("id")[0].textContent;
        if (empId === id) {
            employees[i].getElementsByTagName("department")[0].textContent =
                document.getElementById("empDept").value;

            employees[i].getElementsByTagName("salary")[0].textContent =
                document.getElementById("empSalary").value;

            displayEmployees();
            showMessage("Employee updated successfully!", false);
            return;
        }
    }
    showMessage("Employee not found!", true);
}

function deleteEmployee() {
    let id = document.getElementById("empId").value;
    let employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        let empId = employees[i].getElementsByTagName("id")[0].textContent;
        if (empId === id) {
            employees[i].parentNode.removeChild(employees[i]);
            displayEmployees();
            showMessage("Employee deleted successfully!", false);
            return;
        }
    }
    showMessage("Employee not found!", true);
}
function showMessage(msg, isError) {
    let message = document.getElementById("message");
    message.innerHTML = msg;
    message.style.color = isError ? "red" : "green";
}
