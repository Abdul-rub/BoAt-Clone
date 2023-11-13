const mongoose = require('mongoose')

const TrendingSchema = new mongoose.Schema({
    id:Number,
    image: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const trending = mongoose.model('Trending', TrendingSchema)

module.exports = trending