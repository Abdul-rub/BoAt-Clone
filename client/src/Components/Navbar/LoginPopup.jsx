import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const LoginPopup = () => {
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();
  let credData = localStorage.getItem("userName") || "";
  console.log(credData);



  console.log(isLogin, "STATUS")

  return (
    <Box
      bg={"white"}
      h={"90px"}
      w={"210px"}
      position="absolute"
      right={"15px"}
      top={"125px"}
      zIndex={"10"}
      p="5px"
      borderRadius={"5px"}
      border="1px solid lightgrey"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        mb={"15px"}
        pl={"10px"}
        pr={"10px"}
      >
        <p
          style={{
            color: "red",
            fontSize: "1.1rem",
            margin: "0px",
            fontWeight: "bold",
          }}
        >
          {isLogin ? `Hi ${credData}!` : "Hi boAthead!"}
        </p>
        <Spacer />
        <ImCross cursor={"pointer"}  size={13} />
      </Flex>
      <Link to={isLogin ? "/" : "/login"}>
      <Button
        w={"100%"}
        bg={"Tomato"}
        color={"white"}
        _hover={{ bg: "red" }}
        onClick={isLogin ? () => { logout(); navigate("/"); } : null}
        h={"35px"}
        mb={"5px"}
        fontSize="1.1rem"
      >
        {isLogin ? "Logout" : "Login"}
      </Button>
    </Link>
     
    </Box>
  );
};

export default LoginPopup;
