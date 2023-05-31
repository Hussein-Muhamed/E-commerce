const Product = require('../models/productModel');

const createProduct = async(req, res)=>{
    const {productName, numOfProduct, category} = req.body
    const product = new Product({productName, numOfProduct, category, user:req.user._id})
    await product.save()
    res.send(product)
}

const getProduct = async(req, res)=>{
    const product = await Product.find().populate('user')
    res.send(product)
}

const getByProductName = async(req, res)=>{
    const product = await Product.find({productName:req.body.productName})
    res.send(product)
}

const getMyProduct = async(req, res)=>{
    const myProduct = await Product.find({user:req.user._id})
    res.send(myProduct)
}

module.exports = {createProduct, getProduct, getMyProduct, getByProductName}