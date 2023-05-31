const { required } = require('joi');
const mongoose = require('mongoose');

const {Schema} = mongoose

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    }, numOfProduct:{
        type:Number,
    }, category:{
        type:String,
        enum:["Mens","Woman","Children"],
        required:true
    }, user:{
        type: Schema.Types.ObjectID,
        ref:"User"
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product