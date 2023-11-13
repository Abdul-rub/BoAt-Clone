const mongoose = require('mongoose')

const dcSchema = new mongoose.Schema({
    id:Number,
    image: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const dc = mongoose.model('dc', dcSchema)

module.exports = dc