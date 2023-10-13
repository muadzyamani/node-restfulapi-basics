const express = require('express');

const router = express.Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// fetch all Products
router.get('/', getProducts);

// find a Product from ID
router.get('/:id', getProduct);

// create a Product
router.post('/', createProduct);

// update a Product
router.put('/:id', updateProduct);

// delete a Product from ID
router.delete('/:id',deleteProduct);

module.exports = router;