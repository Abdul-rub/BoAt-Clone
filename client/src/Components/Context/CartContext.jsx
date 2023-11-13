// CartContext.js
import { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);
    const [serverCartData, setServerCartData] = useState([]);
    const [singleProduct,setSingleProduct]= useState([])
    const toast = useToast();

    const storedData = JSON.parse(localStorage.getItem('credencial'));
    const userId = storedData ? storedData._id : null;


    //GET PRODUCT BY ID
    const getProductById = async (productId) => {
      try {
        const res = await fetch(`http://localhost:8000/product/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });
    
        if (!res.ok) {
          console.log(userId, "userr");
          throw new Error('Error fetching product by ID');
        }
    
        let singleData = await res.json();
        setSingleProduct(singleData);
        console.log('Product Data:', singleData);
      } catch (error) {
        console.error(`Error fetching product by ID: ${error.message}`);
      }
    };


    // useEffect(() => {
    //     const storedCartData = JSON.parse(localStorage.getItem('cartData'));
    //     if (storedCartData) {
    //       setCartData(storedCartData);
    //     }
    //   }, []);

      // const saveCartDataToLocalStorage = (data) => {
      //   localStorage.setItem('cartData', JSON.stringify(data));
      // };
    

    const handleToast = () => {
        toast({
            title: "Product Added To Cart.",
            position: "top",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };



    const addToCartOnServer = async (product, userId) => {
        // console.log(product, "GETTING FROM SNGLE")
        const response = await fetch('http://localhost:8000/product/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, product }),
        });
    
        if (!response.ok) {
            console.log(userId, "userr")
            throw new Error('Error adding product to cart');
        }
    };

    const removeFromCartOnServer = async (product, userId) => {
        const response = await fetch('http://localhost:8000/product/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, product }),
        });
    
        if (!response.ok) {
            throw new Error('Error removing product from cart');
        }
    };


  //  console.log(userId, "USERID LIVE")
    
   
   const getCartDataFromServer = async (userId) => {
      
        try {
            const response = await fetch(`http://localhost:8000/product/${userId}/cartdata`);
            if (response.ok) {
                const cartDataFromServer = await response.json();
                // console.log(cartDataFromServer, "CART DATA FROM SERVER")
                setServerCartData(cartDataFromServer);
                // saveCartDataToLocalStorage(cartDataFromServer);
            } else {
                throw new Error('Error fetching cart data from the server');
            }
        } catch (error) {
            console.error(`Error fetching cart data: ${error.message}`);
        }
    };
    


    //Add to Cart
    const addToCart = async (product) => {
        try {
          await addToCartOnServer(product, userId);
          const updatedCartData = [...cartData, { product, quantity: 1 }];
          setCartData(updatedCartData);
          // saveCartDataToLocalStorage(updatedCartData);
          getCartDataFromServer(userId)
           // Save to local storage
          handleToast();
        } catch (error) {
          console.error(`Error adding product to cart: ${error.message}`);
        }
      };



      //Remove from Cart
const removeFromCartAndLocalStorage = async (product) => {
    try {
        await removeFromCartOnServer(product, userId);
        const updatedCartData = cartData.filter((item) => item.product._id !== product);
        setCartData(updatedCartData);
        // saveCartDataToLocalStorage(updatedCartData); 
        getCartDataFromServer(userId)
    } catch (error) {
        console.error(`Error removing product from cart: ${error.message}`);
    }
};

//HandleQuantity
const handleQuantity = async (productId, quantityChange) => {
  // console.log(quantityChange, "QUALITY CHANGE")
  try {
    const response = await fetch('http://localhost:8000/product/handleCartQuantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, product: productId, quantity: quantityChange }),
    });

    if (!response.ok) {
      throw new Error('Error updating cart quantity');
    }

    const updatedCartData = cartData.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          quantity: Math.max(1, Math.min(10, item.quantity + quantityChange)),
        };
      }
      return item;
    });

    setCartData(updatedCartData);
    getCartDataFromServer(userId);
  } catch (error) {
    console.error(`Error updating cart quantity: ${error.message}`);
    // Handle the error, show a toast, etc.
  }
};

//Handle Total
      const getTotal = () => {
        const total = serverCartData.reduce((acc, item) => {
          return acc + item.product.price * item.quantity;
        }, 0);
    
        return total;
      };
    

    // console.log(cartData, "CONTEXT DATA ")
    // console.log(serverCartData.length, "LENGTH" )

    return (
        <CartContext.Provider value={{
          cartData,
          addToCart,
          removeFromCart: removeFromCartAndLocalStorage, 
          handleQuantity,
          getTotal,
          getCartDataFromServer,
          serverCartData,
          userId,
          getProductById,
          singleProduct
        }}>
            {children}
        </CartContext.Provider>
    );
};
