import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize isLogin state based on local storage
  const initialIsLogin = JSON.parse(localStorage.getItem("isLogin")) || false;
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  const login = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", JSON.stringify(true));
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
  };

  useEffect(() => {
    // You can perform any other actions when the login state changes
    console.log("Login state changed:", isLogin);
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
