import { Box, Table } from "@chakra-ui/react";
import { TableBody } from "../TableBody/TableBody";
import { TableHeader } from "../TableHeader/TableHeader";
import { orderByString, orderByNumber } from "../../../db/filters";
import { useState } from "react";

export const CustomTable = ({ items, headers, ...props }) => {
  let [state, setState] = useState(items);
  let [order, setOrder] = useState(null);
  const selectOrder = (property, type) => {
    order === "asc" ? setOrder("desc") : setOrder("asc");
    type === "string" && setState(orderByString(state, property, order));
    type === "number" && setState(orderByNumber(state, property, order));
  };
  return (
    <Box
      w="100%"
      h="100%"
      bg="#fff"
      overflow="auto"
      minH="400px"
      maxH="100vh"
      p="1rem"
      boxShadow="1px 1px 3px 2px #0003"
      {...props}
    >
      <Table variant="simple" py="10px" overflow={"hidden"}>
        <TableHeader headers={headers} onClickOrder={selectOrder}></TableHeader>
        <TableBody items={state}  headers={headers}></TableBody>
      </Table>
    </Box>
  );
};
