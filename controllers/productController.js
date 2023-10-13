const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel');

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        console.log('Fetched all Products.');
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        console.log(`Found a product with ID: ${id}`)
        res.status(200).json(product); 
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log(`Product created.`)
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(500);
            throw new Error(`Unable to find Product with ID: ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        console.log(`Product updated.`)
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(500);
            throw new Error(`Unable to find Product with ID: ${id}`);
        }
        console.log(`Product deleted.`)
        res.status(200).json(product);
    } catch (error) {

    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}