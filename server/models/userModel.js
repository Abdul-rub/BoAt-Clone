const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileImage: String,
  address: {
    city: String,
    contactNumber: String,
    state: String,
    pincode: String,
  },
  paymentDetails:{
      cardholderName: String,
      cardNumber: Number,
      state: String,
      pincode: Number,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;
