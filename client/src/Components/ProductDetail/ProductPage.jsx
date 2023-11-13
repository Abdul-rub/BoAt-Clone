import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Divider,
  Container,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { FaStar } from "react-icons/fa";
import warranty from "./Images/image 116.png";
import Description from "./Description";
import Celebrity from "./Celebrity";
import Warranty from "./Warrenty";
import Faq from "./Faqs";
import { useCart } from "../Context/CartContext";
import { useParams } from "react-router-dom";

export function ProductDetails() {
  // const { productData, handleCartData } = useContext(AppContext);
  // const {  cartData, addToCart, removeFromCart} =useContext(CartContext)
  const [singleProduct, setSingleProduct] = useState([])
  const { productId } = useParams();
  console.log("Product ID:", productId);

  const { handleQuantity,
    userId, serverCartData,
    getCartDataFromServer,
    addToCart } = useCart();
  const [isLargerThan576] = useMediaQuery("(min-width: 620px)");
  const [isLargerThan406] = useMediaQuery("(min-width: 400px)");


  useEffect(()=>{
    const getProductById = async (productId) => {
      try {
        const res = await fetch(`http://localhost:8000/product/${productId}`)
  
        if (!res.ok) {
          console.log(userId, "userr");
          throw new Error('Error fetching product by ID');
        }
  
        let singleData = await res.json();
        setSingleProduct([singleData]);
        // console.log('Product Data:', singleData);
      } catch (error) {
        console.error(`Error fetching product by ID: ${error.message}`);
      }
    };
   getProductById(productId)
  },[productId])


  console.log(singleProduct, "SINGLE PRODUCT")

  return (
    <Box>
      <Container
        maxW={"container.md"}
        margin="auto"
        // border={"1px solid black"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {singleProduct.length > 0 &&
          singleProduct.map((item) => (
            <>
              <Flex
                width={"100%"}
                margin={"auto"}
                justifyContent={"center"}
                alignItems={"center"}
                mb="5px"
                //border={"1px solid black"}
                flexWrap={isLargerThan576 ? "nowrap" : "wrap"}
              >
                <Box
                  width={"100%"}
                  // border={"1px solid green"}
                  p="0"
                  height={"450px"}
                >
                  <Image
                    w="100%"
                    height={"auto"}
                    src={item.image || item.images[0]}
                    alt={item.pname || item.title}
                  />
                </Box>

                <Box
                  width={"100%"}
                  //border={"1px solid green"}
                  p="0"
                  height={"450px"}
                  s
                >
                  <Text
                    fontWeight={"bold"}
                    fontSize={"24px"}
                    noOfLines={"1"}
                    textAlign={"left"}
                    mt={"20px"}
                    ml={"10px"}
                  >
                    {item.pname || item.title}
                  </Text>
                  <Text
                    fontWeight={"bold"}
                    fontSize={"16px"}
                    noOfLines={"1"}
                    textAlign={"left"}
                    mt={"20px"}
                    ml={"10px"}
                  >
                    {item.category ? item.category : "Bluetooth Music Device"}
                  </Text>

                  <Flex
                    gap={"0.5rem"}
                    alignItems={"center"}
                    marginBottom="5px"
                    ml={"10px"}
                    mt={"20px"}
                  >
                    <FaStar color="red" size={22} border="none" />
                    <Text
                      fontWeight={"bold"}
                      fontSize={"16px"}
                      noOfLines={"1"}
                      textAlign={"left"}
                    >
                      {item.rating} {item.review ? `| ${item.review}` : ""}
                    </Text>
                  </Flex>

                  <Flex
                    gap="2rem"
                    alignItems={"center"}
                    marginBottom="5px"
                    ml={"10px"}
                    mt={"20px"}
                    flexWrap={isLargerThan406 ? "nowrap" : "wrap"}
                  >
                    <Text
                      fontSize={"38px"}
                      ml="5px"
                      fontWeight={"bold"}
                      color={"red"}
                    >
                      ₹{item.price}.00
                    </Text>
                    <Text
                      textDecoration={"line-through"}
                      mt={isLargerThan406 ? "30px" : "-30px"}
                      fontSize={"28px"}
                    >
                      ₹{item.strprice || item.strike_price}.00
                    </Text>
                  </Flex>

                  <Text
                    textAlign={"left"}
                    fontWeight={"bold"}
                    fontSize={"18px"}
                    noOfLines={"1"}
                    ml={"10px"}
                    mt={"20px"}
                  >
                    {item.dec || item.youSaved}
                  </Text>
                  <Text textAlign={"left"} fontSize={"14px"} ml={"10px"}>
                    Inclusive Of All Taxes
                  </Text>

                  <Box mt={"20px"} textAlign={"center"}>
                    <Button
                      onClick={() => addToCart(item._id)}
                      width={"100%"}
                      _hover={"none"}
                      p="0px 10px"
                      color={"white"}
                      m={"auto"}
                      bg="red"
                    >
                      ADD TO CART
                    </Button>
                  </Box>
                  <Box bg={"black"} mt="10px" borderRadius={"10px"}>
                    <img
                      className="warrantyImage"
                      src={warranty}
                      alt="warranty"
                    />
                  </Box>
                </Box>
              </Flex>
              <Divider borderColor="black" mt={"10px"} />
              <br></br>
              <Text fontSize={"2rem"} as={"b"}>
                {item.title || item.pname}
              </Text>
            </>
          ))}


      </Container>
      <Description />
    </Box>
  );
}
