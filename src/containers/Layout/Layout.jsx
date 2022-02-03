import React from "react";
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

export const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
        <div className="layout__content_wrapper">{children}</div>
      </div>
    </>
  );
};
