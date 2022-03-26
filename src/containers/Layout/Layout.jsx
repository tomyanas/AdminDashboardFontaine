import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowLeftRound } from "../../assets/icons/ArrowLeftRound";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%" display="flex" flexDirection="column" bg={useColorModeValue("gray.100","gray.800")}>
      <Header onOpenSidebar={onOpen} />
      <Box w="100%" h="100%" display="flex">
        <Box h="100%" display={{ base: "none", lg: "block" }}>
          <Sidebar />
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent overflowY={"auto"} maxW={"fit-content"}>
            <DrawerCloseButton _focus={{ outline: "none" }}>
              <ArrowLeftRound />
            </DrawerCloseButton>
            <Sidebar />
          </DrawerContent>
        </Drawer>
        <Box
          w="100%"
          h="100%"
          display="flex"
          p={{ base: "20px 10px", md: "20px" }}
          overflow="hidden"
          overflowY="auto"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
