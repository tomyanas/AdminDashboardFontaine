import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const CustomModal = ({ Component, isOpen, onClose, ...props }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
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
        <ModalBody>
          <Component onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
