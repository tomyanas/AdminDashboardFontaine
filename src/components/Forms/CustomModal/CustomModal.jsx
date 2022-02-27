import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";

export const CustomModal = ({ Form, isOpen, onClose, ...props }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside" {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Form onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };