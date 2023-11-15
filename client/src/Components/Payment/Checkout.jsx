import React, { useEffect, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../Styles/payment.css";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import axios from "axios"

const Checkout = () => {
  const { addAddressData } = useAuth();
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const {totalprice}= useCart()


  const storedData = JSON.parse(localStorage.getItem('credencial'));
  const userId = storedData ? storedData._id : null;

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await fetch(`http://localhost:8000/auth/${userId}/getAddress`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const addressData = await response.json();
        console.log(addressData.address, "USER ADDRESS");


        setAddress(addressData.address.city || ""); 
        setNumber(addressData.address.contactNumber || "");
        setState(addressData.address.state || "");
        setPincode(addressData.address.pincode || "");
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    if (userId) {
      getAddress();
    }
  }, [userId]);


  //Payment 
  const handleCheckout = async (amount) => {
    const { data: { key } } = await axios.get("http://localhost:8000/api/getkey");

    const { data: { order } } = await axios.post("http://localhost:8000/api/checkout", {
      amount: amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Razorpay_Integration_Assignmnet",
      description: "Simple Razorpay Integration",
      image: "https://avatars.githubusercontent.com/u/70228714?s=400&u=e831da0977183e55eda8868ba6c80a7646e61dc8&v=4",
      order_id: order.id,
      callback_url: "http://localhost:8000/api/verifypayment",
      prefill: {
        name: "Abdul Rub",
        email: "test01@example.com",
        contact: "12345677"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", function (response) {
      console.log(response.error);
    });

    razor.open();
  };



  const handleAddress = async () => {
    if (address === "" || number === "" || state === "" || pincode === "") {
      toast({
        title: `Please fill all the information.`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      try {
        await addAddressData(address, number, state, pincode, userId);
        toast({
          title: `Address Registered Successfully`,
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        // navigate("/payments");
      } catch (error) {
        console.error("Error adding address:", error.message);
        toast({
          title: "Error adding address.",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    }
  };
  return (
    <Box className="backgroundColor">
      <Box className="checkoutDiv">
        <Box className="checkoutHeadDiv">
          <h2 className="checkoutHead">Delivery Address</h2>
        </Box>

        <label>City</label>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Contact Number</label>
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={number}
          required
          onChange={(e) => setNumber(e.target.value)}
        />

        <label>State</label>
        <input
          type="text"
          placeholder="Enter your state"
          value={state}
          required
          onChange={(e) => setState(e.target.value)}
        />

        <label>Pincode</label>
        <input
          type="text"
          placeholder="Enter your area pincode"
          value={pincode}
          required
          onChange={(e) => setPincode(e.target.value)}
        />

        <button className="checkoutBtn" onClick={handleAddress}>
          Submit
        </button>
        <button className="checkoutBtn"  onClick={() => handleCheckout(totalprice)}>Make Payment of {totalprice} </button>
      </Box>
    </Box>
  );
};

export default Checkout;
