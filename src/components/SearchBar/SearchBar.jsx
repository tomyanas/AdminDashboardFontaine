import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

export const SearchBar = ({ searchFunction, resetFunction }) => {
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
        type="text"
        placeholder="Escribe Algo.."
        pr="4.5rem"
        value={search}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" type="button" onClick={handleReset}>
          x
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
