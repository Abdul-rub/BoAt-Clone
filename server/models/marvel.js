const mongoose = require('mongoose')

const MarvelSchema = new mongoose.Schema({
    id:Number,
    image: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const Marvel = mongoose.model('marvel', MarvelSchema)

module.exports = Marvel