


import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import errorPage from "../src/errorPage.png"

const ErrorPage = () => {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center" marginBottom="20">
        <Image src={errorPage} alt="Error Page"/>
    </Box>
  )
}

export default ErrorPage;
