import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export const CustomDrawer = ({
  children,
  Component,
  isOpen,
  onClose,
  closeButton = true,
  ...props
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      scrollBehavior="inside"
      size="lg"
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent>
        {closeButton && (
          <DrawerCloseButton
            _hover={{
              transform: "rotate(180deg)",
              transitionDuration: "0.6s",
              outline: "none",
              fontSize: "1rem",
            }}
            _focus={{
              bg: "transparent",
              outline: "none",
            }}
          />
        )}
        <DrawerBody>
          {Component && <Component onClose={onClose} />}
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
