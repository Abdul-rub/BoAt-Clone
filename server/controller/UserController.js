const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');




const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your-secret-key',
      { expiresIn: '1h' } 
    );

    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Taking Address
const UserAddressDetails = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { city, contactNumber, state, pincode } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    user.address = {
      city,
      contactNumber,
      state,
      pincode,
    };

    await user.save();

    res.status(201).json({ message: 'User address added', address: user.address });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const paymentDetail = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cardholderName, cardNumber, expDate, cvv } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.paymentDetails = {
      cardholderName,
      cardNumber,
      expDate,
      cvv,
    };

    await user.save();

    res.status(200).json({ message: 'Payment processed successfully', paymentDetails: user.paymentDetails });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { registerUser, loginUser,UserAddressDetails,paymentDetail };