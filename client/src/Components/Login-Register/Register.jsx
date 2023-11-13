import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { Container, Form } from "./RegisterStyles";

export function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Error registering user');
      }
  
      const responseData = await response.json();
  
      toast({
        title: `Account Created Successfully`,
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      console.error('Error registering user:', error);
      toast({
        title: `Error Registering`,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <div className="cont">
        <div className="cont2">
          <div className="heading">
            <h1>Register</h1>
            <p>Please fill in the fields below:</p>
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
            <div className="input-box">
              <input
                placeholder="User Name"
                required
                name="username"
                onChange={handleChange}
                type="text"
                id="username"
              />
            </div>
           
            <div className="input-box">
              <input
                placeholder="Email"
                required
                name="email"
                onChange={handleChange}
                type="email"
                id="customer_email"
              />
            </div>
            <div className="input-box">
              <input
                placeholder="Password"
                required
                name="password"
                onChange={handleChange}
                type="password"
                id="customer_password"
              />
            </div>
            <div className="action-bottom">
              <p>
                <input type="submit" value="Create Account" />
              </p>
              <span>
                Already have an account ?&nbsp;
                <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
