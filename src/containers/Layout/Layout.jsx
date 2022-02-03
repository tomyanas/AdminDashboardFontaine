import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./Layout.scss";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ArrowLeftRound } from "../../assets/icons/ArrowLeftRound";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="layout">
      <Header onOpenSidebar={onOpen} />
      <div className="layout__container">
        <div className="layout__sidebar_desktop">
          <Sidebar />
        </div>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent overflowY={"auto"} maxW={"fit-content"}>
            <DrawerCloseButton _focus={{ outline: "none" }}>
              <ArrowLeftRound />
            </DrawerCloseButton>
            <Sidebar />
          </DrawerContent>
        </Drawer>
        <div className="layout__content_wrapper"><Outlet/></div>
      </div>
    </div>
  );
};

export default Layout