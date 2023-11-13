const mongoose = require('mongoose')

const NewLaunchesSchema = new mongoose.Schema({
    id:Number,
    video:String,
    image: String,
    title: String,
    rating: String,
    strprice: String,
    price: Number,
    dec: String,

})

const newLaunch = mongoose.model('newLaunch', NewLaunchesSchema)

module.exports = newLaunch;