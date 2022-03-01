import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { Trash } from "../assets/icons/Trash";

export const DeleleItemMessage = ({onClose, onClickDelete}) => {
  return (
    <Box
      display="flex"
      gap="1rem"
      justifyContent="space-between"
      alignItems="center"
      flexDir="column"
      p="1rem"
      w="100%"
      h="100%"
    >
      <Trash height="2.5rem" width="2.5rem"/>
      <Heading>Delete</Heading>
      <Text>¿Está seguro que desea eliminar?</Text>
      <HStack>
        <Button bg="green" color="white" 
        onClick={onClose}>
          Cancelar
        </Button>
        <Button bg="red" color="white" onClick={onClickDelete}>
          Eliminar
        </Button>
      </HStack>
    </Box>
  );
};
