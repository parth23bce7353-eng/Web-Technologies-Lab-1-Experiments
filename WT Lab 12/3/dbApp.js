const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_URI = 'mongodb://localhost:27017/productDB'; // Change to your Atlas URI if needed

mongoose.connect(DB_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Database connection error:', err));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    inStock: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Returns the modified document
        );
        if (!updatedProduct) return res.status(404).send('Product not found.');
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send('Product not found.');
        res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`---------------------------------------------------`);
    console.log(`Persistence API running at http://localhost:${PORT}`);
    console.log(`---------------------------------------------------`);
});