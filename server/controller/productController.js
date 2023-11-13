const Product = require('../models/productModel');
const Sailboat = require("../models/sailwithboat")

// GET all products
 const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Generate Random Data
const getAllProductsRandomly = async (req, res) => {
  try {
    const products = await Product.find();
    
    // Shuffle the array
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    // Return only 4 products
    const selectedProducts = products.slice(0, 4);

    res.json(selectedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST a new product
const  createProduct = async (req, res) => {
  const { category, title, images, price, strike_price, discount, rating, youSaved, review } = req.body;

  try {
    const product = new Product({
      category,
      title,
      images,
      price,
      strike_price,
      discount,
      rating,
      youSaved,
      review,
    });

    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//GET products by id 
const getProductById = async (req, res) => {
  const productId = req.params.productId;
  console.log("Received Product ID:", productId);

  try {
      const product = await Product.findById(productId);
      console.log('Product from Database:', product);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: `Error fetching product data: ${error.message}` });
  }
};

module.exports={getAllProducts,createProduct,getProductById,getAllProductsRandomly}