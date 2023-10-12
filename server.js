const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

const Product = require('./models/productModel');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Node');
});

// fetch all Products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// find a Product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// create a Product
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update a Product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Unable to find Product with ID: ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

const runServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:PT9ukN1mO5bBQPgi@cluster0.kipkylu.mongodb.net/Node-Api?retryWrites=true&w=majority');
        console.log('Connected to MongoDB!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.`);
        });
    } catch (error) {
        console.log(error);
    }

};

runServer();