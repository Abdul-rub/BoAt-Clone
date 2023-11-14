const User = require("../models/userModel");
const Product = require("../models/productModel");

// Add a product to the user's cart
const addToCart = async (req, res) => {
    const { userId, product, quantity } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingCartItem = user.cart.find((item) => item && item.product && item.product._id.toString() === product._id.toString()
        );

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            const populatedProduct = await Product.findById(product._id);
            user.cart.push({ product: populatedProduct, quantity });
        }
        await user.save();
        console.log('Product added to cart:', { userId, product, quantity });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: `Error updating cart: ${error.message}` });
    }
};

// Remove Cart
const removeFromCart = async (req, res) => {
    const { userId, product, quantity } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingCartItemIndex = user.cart.findIndex(item => item.product && item.product.toString() === product.toString());

        if (existingCartItemIndex !== -1) {
            const updatedQuantity = user.cart[existingCartItemIndex].quantity - quantity;
            if (updatedQuantity > 0) {
                user.cart[existingCartItemIndex].quantity = updatedQuantity;
            } else {
                user.cart.splice(existingCartItemIndex, 1);
            }
        } else {
            // Handle the case where the product is not in the cart
            throw new Error('Product not found in the cart');
        }

        await user.save();

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: `Error updating cart: ${error.message}` });
    }
}

const getCartData = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('cart.product');
        console.log('User:', user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartData = user.cart.map(cartItem => ({
            product: cartItem.product,
            quantity: cartItem.quantity,
            _id: cartItem._id
        }));
       console.log(cartData)
        res.json(cartData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: `Error fetching cart data: ${error.message}` });
    }
};

const handleCartQuantity = async (req, res) => {
    const { userId, product, quantity } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      const existingCartItemIndex = user.cart.findIndex(item => item.product && item.product.toString() === product.toString());
  
      if (existingCartItemIndex !== -1) {
        user.cart[existingCartItemIndex].quantity = quantity;
      } else {

        throw new Error('Product not found in the cart');
      }
  
      await user.save();
  
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ error: `Error updating cart quantity: ${error.message}` });
    }
  };


module.exports = { addToCart, removeFromCart, getCartData,handleCartQuantity }
