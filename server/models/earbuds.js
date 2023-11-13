const mongoose = require('mongoose')

const EarBudsSchema = new mongoose.Schema({
    id:Number,
    image: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const earBud = mongoose.model('earBud', EarBudsSchema)

module.exports = earBud