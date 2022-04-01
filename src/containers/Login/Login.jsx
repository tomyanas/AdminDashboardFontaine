import {
  Box,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import Logo from '../../components/Header/Logo';

const Login = ({ children, subtitle }) => {
  let navigate = useNavigate();
  let auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user]);
  return (
    <Container
      maxW="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('#efefef')}
    >
      <Container
        maxW="lg"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="lg"
        borderRadius="3px"
        p={6}
      >
        <Box d="flex" alignItems="center" flexDirection="column" w="100%">
          <Box m={6}>
            <Logo
              height="28px"
              color={useColorModeValue('#222220', '#fafafa')}
            />
          </Box>

          <Text fontSize="2xl" fontFamily="Work sans" display="block">
            {subtitle}
          </Text>
        </Box>
        <Box w="100%" p={8}>
          {children}
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
