const express = require('express');
const connection = require('./connection/db');
// const Razorpay = require('razorpay');
const cors = require('cors');
const productrouter = require('./route/productsRoutes');
const userrouter = require('./route/userRoutes');
const paymentrouter = require('./route/paymentRoute');

const app = express();
app.use(express.json());
app.use(cors());

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// module.exports.instance = instance;
// module.exports = {
//     app,
//     instance, 
//   };
  

// routes
app.use('/product', productrouter);
app.use('/auth', userrouter);
app.use('/api', paymentrouter);

app.get('/api/getkey', (req, res) => {
  res.status(200).json({ key: [process.env.RAZORPAY_API_KEY] });
});

// const postProductsToDatabase = async () => {
//     try {
//       await dc.insertMany(SailWithBoat);
//       console.log('Data posted to the database successfully');
//     } catch (error) {
//       console.error('Error posting data to the database:', error);
//     } finally {
//       // Close the database connection if needed
//       // mongoose.connection.close();
//     }
//   };

// postProductsToDatabase();

// Connection
app.listen(process.env.PORT || 8080, async (req, res) => {
  try {
    await connection;
    console.log('Connection Successful');
  } catch (error) {
    console.log('Connect to db failed');
    console.log(error);
  }
  console.log(`Listening to PORT ${process.env.PORT}`);
});
