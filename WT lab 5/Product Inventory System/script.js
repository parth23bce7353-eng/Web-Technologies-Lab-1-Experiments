let products = [];

function loadProducts() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then(data => {
            products = data;
            displayProducts();
            showMessage("Inventory loaded successfully!", false);
        })
        .catch(error => {
            showMessage("Error loading or parsing JSON!", true);
            console.error(error);
        });
}

function displayProducts(list = products) {
    let table = document.getElementById("inventoryTable");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
        </tr>
    `;
    if (list.length === 0) {
        showMessage("No products found!", true);
        return;
    }
    list.forEach(product => {
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = product.id;
        row.insertCell(1).innerHTML = product.name;
        row.insertCell(2).innerHTML = product.category;
        row.insertCell(3).innerHTML = product.price;
        row.insertCell(4).innerHTML = product.stock;
    });
}

function validateInputs(requireAll = true) {
    let id = document.getElementById("prodId").value.trim();
    let name = document.getElementById("prodName").value.trim();
    let category = document.getElementById("prodCategory").value.trim();
    let price = document.getElementById("prodPrice").value.trim();
    let stock = document.getElementById("prodStock").value.trim();
    if (!id) {
        showMessage("Product ID is required!", true);
        return false;
    }
    if (requireAll && (!name || !category || !price || !stock)) {
        showMessage("All fields are required!", true);
        return false;
    }
    if (price && price <= 0) {
        showMessage("Price must be greater than 0!", true);
        return false;
    }
    if (stock && stock < 0) {
        showMessage("Stock cannot be negative!", true);
        return false;
    }
    return true;
}

function addProduct() {
    if (!validateInputs()) return;
    let id = parseInt(document.getElementById("prodId").value);
    if (products.some(p => p.id === id)) {
        showMessage("Product ID already exists!", true);
        return;
    }
    let newProduct = {
        id: id,
        name: document.getElementById("prodName").value,
        category: document.getElementById("prodCategory").value,
        price: parseFloat(document.getElementById("prodPrice").value),
        stock: parseInt(document.getElementById("prodStock").value)
    };
    products.push(newProduct);
    displayProducts();
    showMessage("Product added successfully!", false);
}

function editProduct() {
    if (!validateInputs(false)) return;
    let id = parseInt(document.getElementById("prodId").value);
    let product = products.find(p => p.id === id);
    if (!product) {
        showMessage("Product not found!", true);
        return;
    }
    let newPrice = document.getElementById("prodPrice").value;
    let newStock = document.getElementById("prodStock").value;
    if (newPrice) {
        if (newPrice <= 0) {
            showMessage("Price must be greater than 0!", true);
            return;
        }
        product.price = parseFloat(newPrice);
    }
    if (newStock) {
        if (newStock < 0) {
            showMessage("Stock cannot be negative!", true);
            return;
        }
        product.stock = parseInt(newStock);
    }
    displayProducts();
    showMessage("Product updated successfully!", false);
}

function deleteProduct() {
    if (!validateInputs(false)) return;
    let id = parseInt(document.getElementById("prodId").value);
    let index = products.findIndex(p => p.id === id);
    if (index === -1) {
        showMessage("Product not found!", true);
        return;
    }
    products.splice(index, 1);
    displayProducts();
    showMessage("Product deleted successfully!", false);
}

function searchByCategory() {
    let category = document.getElementById("searchCategory").value.trim();
    if (!category) {
        showMessage("Enter category to search!", true);
        return;
    }
    let filtered = products.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filtered);
    showMessage("Search completed!", false);
}

function showMessage(msg, isError) {
    let message = document.getElementById("message");
    message.innerHTML = msg;
    message.style.color = isError ? "red" : "green";
}
