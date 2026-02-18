let xmlDoc = null;

function loadBooks() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xmlDoc = xhr.responseXML;
                if (!xmlDoc) {
                    showMessage("Malformed XML file!", true);
                    return;
                }
                displayBooks();
                showMessage("Books loaded successfully!", false);
            } else {
                showMessage("Error loading XML file!", true);
            }
        }
    };
    xhr.send();
}

function displayBooks() {
    let table = document.getElementById("bookTable");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
        </tr>
    `;
    let books = xmlDoc.getElementsByTagName("book");
    if (books.length === 0) {
        showMessage("No books available!", true);
        return;
    }
    for (let i = 0; i < books.length; i++) {
        let id = books[i].getElementsByTagName("id")[0].textContent;
        let title = books[i].getElementsByTagName("title")[0].textContent;
        let author = books[i].getElementsByTagName("author")[0].textContent;
        let status = books[i].getElementsByTagName("status")[0].textContent;
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = title;
        row.insertCell(2).innerHTML = author;
        row.insertCell(3).innerHTML = status;
    }
}

function validateFields(checkAll = true) {
    let id = document.getElementById("bookId").value.trim();
    let title = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();
    let status = document.getElementById("bookStatus").value;
    if (!id) {
        showMessage("Book ID is required!", true);
        return false;
    }
    if (checkAll && (!title || !author || !status)) {
        showMessage("All fields are required!", true);
        return false;
    }
    return true;
}

function addBook() {
    if (!xmlDoc) {
        showMessage("Load XML first!", true);
        return;
    }
    if (!validateFields()) return;
    let id = document.getElementById("bookId").value;
    let books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists!", true);
            return;
        }
    }
    let book = xmlDoc.createElement("book");
    let idNode = xmlDoc.createElement("id");
    idNode.appendChild(xmlDoc.createTextNode(id));
    let titleNode = xmlDoc.createElement("title");
    titleNode.appendChild(xmlDoc.createTextNode(
        document.getElementById("bookTitle").value
    ));
    let authorNode = xmlDoc.createElement("author");
    authorNode.appendChild(xmlDoc.createTextNode(
        document.getElementById("bookAuthor").value
    ));
    let statusNode = xmlDoc.createElement("status");
    statusNode.appendChild(xmlDoc.createTextNode(
        document.getElementById("bookStatus").value
    ));
    book.appendChild(idNode);
    book.appendChild(titleNode);
    book.appendChild(authorNode);
    book.appendChild(statusNode);
    xmlDoc.getElementsByTagName("library")[0].appendChild(book);
    displayBooks();
    showMessage("Book added successfully!", false);
}

function updateBook() {
    if (!xmlDoc) {
        showMessage("Load XML first!", true);
        return;
    }
    if (!validateFields(false)) return;
    let id = document.getElementById("bookId").value;
    let status = document.getElementById("bookStatus").value;
    if (!status) {
        showMessage("Select status to update!", true);
        return;
    }
    let books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].getElementsByTagName("status")[0].textContent = status;
            displayBooks();
            showMessage("Book status updated successfully!", false);
            return;
        }
    }
    showMessage("Book not found!", true);
}

function deleteBook() {
    if (!xmlDoc) {
        showMessage("Load XML first!", true);
        return;
    }
    if (!validateFields(false)) return;
    let id = document.getElementById("bookId").value;
    let books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].parentNode.removeChild(books[i]);
            displayBooks();
            showMessage("Book deleted successfully!", false);
            return;
        }
    }
    showMessage("Book not found!", true);
}

function showMessage(msg, isError) {
    let message = document.getElementById("message");
    message.innerHTML = msg;
    message.style.color = isError ? "red" : "green";
}
