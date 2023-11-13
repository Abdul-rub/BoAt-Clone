const mongoose = require('mongoose')

const bestSellerSchema = new mongoose.Schema({
    id:Number,
    image: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const bestSeller = mongoose.model('BestSeller', bestSellerSchema)

module.exports = bestSeller