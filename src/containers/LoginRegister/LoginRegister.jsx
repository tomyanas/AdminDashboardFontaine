import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import React from 'react';
import Login from "../../components/Authentications/Login";
import Signup from "../../components/Authentications/Signup";

const LoginRegister = () => {
    return (
        <Container maxW="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={2}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans">
                Fontaine Admin
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab _selected={{ color: 'white', bg: 'red.400' }} _focus={{ outline: "none" }}>Login</Tab>
            <Tab _selected={{ color: 'white', bg: 'red.400' }} _focus={{ outline: "none" }}>Sign Up</Tab>
          </TabList>
          <TabPanels >
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup /> 
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>

    );
};

export default LoginRegister;
