import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {


  const initialIsLogin = JSON.parse(localStorage.getItem("isLogin")) || false;
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [addressData, setAddressData] = useState({});

  const login = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", JSON.stringify(true));
    
  };
  useEffect(() => {
    console.log("Login state changed:", isLogin);
  }, [isLogin]);
  


  //Logout
  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("credencial")
    window.location.reload()
  };







  //Addinf user Address
  const addAddressData = async (city, contactNumber, state, pincode, userId) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/${userId}/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          city,
          contactNumber,
          state,
          pincode,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Address added successfully:', result);
      } else {
        throw new Error('Error adding address');
      }
    } catch (error) {
      console.error('Error adding address:', error.message);
      throw new Error('Error adding address');
    }
  };


  // const getAddress = async (userId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/auth/${userId}/getAddress`);
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const address = await response.json();
  //     console.log(address.address, "USER ADDRESSS");
  //   } catch (error) {
  //     console.error('Error fetching address:', error);
  //   }
  // };
  



  return (
    <AuthContext.Provider value={{ isLogin, login, logout,addAddressData }}>
      {children}
    </AuthContext.Provider>
  );
};
