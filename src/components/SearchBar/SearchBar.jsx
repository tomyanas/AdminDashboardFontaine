import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
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
        bg="#EEEEEE"
        borderRadius={0}
        border="none"
        _placeholder={{ color: "#777", fontWeight: 600 }}
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
          _hover={{
            background: "transparent",
            color: "crimson",
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
