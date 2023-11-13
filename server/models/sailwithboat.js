const mongoose = require('mongoose')

const sailWithBoatSchema = new mongoose.Schema({
    image: String,
    price: String,
    pname: String,
    strprice: String,
    rating: String,
    dec: String,

})

const sailWithBoat = mongoose.model('SailWithBoat', sailWithBoatSchema)

module.exports = sailWithBoat