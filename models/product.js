const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    nameproduct: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
},{collection:'products'});
const Product = mongoose.model('products', productSchema);

module.exports = Product;