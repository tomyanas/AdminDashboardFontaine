import { Button} from "@chakra-ui/react";
import { Plus } from "phosphor-react";

export const ButtonAdd = ({ children,  ...props }) => {
  return (
    <Button
      {...props}
      leftIcon={<Plus size={24} weight="bold" />}
      minW={"fit-content"}
      color="#fff"
      bg="#4a8cca"
      borderRadius={0}
      _focus={{ outline: "none" }}
      _hover={{ bg: "#51a6f5" }}
    >
      {children}
    </Button>
  );
};
