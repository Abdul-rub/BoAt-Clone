const mongoose = require('mongoose')

const trendingANCSchema = new mongoose.Schema({
    id:Number,
    images: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const trendingANC = mongoose.model('trendingANC', trendingANCSchema)

module.exports = trendingANC