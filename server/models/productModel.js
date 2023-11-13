const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: String,
    title: String,
    images: [String],
    price: Number,
    strike_price: Number,
    discount: String,
    rating: String,
    youSaved: String,
    review: String,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product