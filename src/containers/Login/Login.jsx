import { Box, Container, Text, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

import Logoimage from "../../assets/image/fontaine.svg";

const Login = ({children, subtitle}) => {
  let navigate = useNavigate();
  let auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user]);
  return (
    <Container
      maxW="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#efefef"
    >
      <Container maxW="lg" bg="white" boxShadow="lg" borderRadius="3px" p={6}>
        <Box
          d="flex"
          alignItems="center"
          flexDirection="column"
          bg="white"
          w="100%"
        >
          <Image src={Logoimage} alt="Fontaine-logo" w={"50%"} m={6} />

          <Text fontSize="2xl" fontFamily="Work sans" display="block">
              {subtitle}
          </Text>
        </Box>
        <Box bg="white" w="100%" p={8} borderRadius="lg">
          {children}
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
