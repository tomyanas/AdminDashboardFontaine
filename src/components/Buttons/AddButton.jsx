import { Button, useColorModeValue } from "@chakra-ui/react";
import { Plus } from "phosphor-react";

export const ButtonAdd = ({ children, ...props }) => {
  return (
    <Button
      leftIcon={<Plus size={24} weight="bold" />}
      minW={"fit-content"}
      color={useColorModeValue("#fff",'#1a202c')}
      bg={useColorModeValue("#4a8cca","#51a6f5")}
      borderRadius={0}
      fontWeight= {700}
      _focus={{ outline: "none" }}
      _hover={{ bg: useColorModeValue("#71b9fc","#4a8cca") }}
      {...props}
    >
      {children}
    </Button>
  );
};
