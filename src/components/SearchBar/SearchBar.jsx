import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Backspace } from "phosphor-react";

export const SearchBar = ({ searchFunction, resetFunction, ...props }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    searchFunction(e.target.value);
  };
  const handleReset = () => {
    setSearch("");
    resetFunction();
  }; 

  return (
    <InputGroup size="md">
      <Input
        {...props}
        // bg={useColorModeValue('#EEEEEE', 'transparent')}
        bg={useColorModeValue('#EEEEEE', '#2d3748')}
        borderRadius={0}
        border={useColorModeValue('none', '1px solid #eeeeee')}
        _placeholder={{ color: useColorModeValue("#777777",'#aaaaaa'), fontWeight: 600 }}
        _focus={{ border: "2px solid #51a6f5" }}
        placeholder="Escribe Algo.."
        type="text"
        pr="4.5rem"
        value={search}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          onClick={handleReset}
          variant="ghost"
          outline="none"
          zIndex={0}
          color= {useColorModeValue("#777777",'#aaaaaa')}
          _hover={{
            background: "transparent",
            color: "#51a6f5",
          }}
          _active={{}}
          _focus={{
            background: "transparent",
            outline: "none",
          }}
          icon={<Backspace size={24} />}
        />
      </InputRightElement>
    </InputGroup>
  );
};
