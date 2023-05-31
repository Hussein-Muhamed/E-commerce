const express = require('express');
const verifyToken = require('../Utils/Token')
const {createProduct, getProduct, getMyProduct, getByProductName} = require('../controllers/productControllers')

const router = express.Router();


//? Create Product
router.post('/', verifyToken, createProduct) 

//? Get Product with Authorization
router.get('/', verifyToken, getProduct)

//? Get my Product
router.get('/myProduct', verifyToken, getMyProduct)

//? Search by product name
router.get('/searchByName', verifyToken, getByProductName)

module.exports = router