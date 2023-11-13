import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { Container, Form } from "./LoginStyles";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";


export function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login, isLogin } = useAuth()
  const navigate = useNavigate();
  const toast = useToast();


  // console.log(login, "LOGIN BABY")
  // console.log(isLogin, "LOGIN BABY")
  // console.log(logout, "LOGIN BABY")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }

      
      const responseData = await response.json();
      console.log(responseData)
      login();
      localStorage.setItem("credencial",  JSON.stringify(responseData.user))
      localStorage.setItem("authToken", responseData.token)
      localStorage.setItem("userName", responseData.user.username)

      console.log(isLogin, "LOGIN BABY")
      // console.log(name , "USER NAME")
      



      toast({
        title: `Login Successful`,
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true,
      });


      navigate("/");
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: `Error Logging In`,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
    }


  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <Container>
      <div className="cont">
        <div className="cont2">
          <div className="heading">
            <h1>Login</h1>
            <p>Please enter your e-mail and password:</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="socials">
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://pnggrid.com/wp-content/uploads/2021/07/Facebook-Logo-Square-768x768.png"
                  alt=""
                />
              </div>
            </div>
            <div className="login-email">
              <input
                name="email"
                placeholder="Email"
                onChange={onChange}
                type="email"
                id="customer_email"
                required
              />
            </div>
            <div className="login-password">
              <div className="text-over-input">
                <input
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                  type="password"
                  id="customer_password"
                  required
                />
              </div>
              {/* <div onClick={handlePassword} className="forgot-password">
                Forget Password?
              </div> */}
            </div>
            <div className="action-bottom">
              <p>
                <input type="submit" value="Login" className="btn" />
              </p>
              <div style={{ textAlign: "center", marginLeft: "20px" }}>
                New customer?
                <Link to="/account/register">
                  <span style={{ marginLeft: "20px" }}>Create an account</span>{" "}
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
