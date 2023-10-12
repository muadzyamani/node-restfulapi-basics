const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

const Product = require('./models/productModel');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Node');
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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