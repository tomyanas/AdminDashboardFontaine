import { Box, Table } from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { orderByString, orderByNumber } from "../../../db/filters";
import { useEffect, useState } from "react";
import { TablePagination } from "./TablePagination";

export const CustomTable = ({ items = [], headers, ...props }) => {
  let [state, setState] = useState(items);
  let [currentPage, setCurrentPage] = useState([]);
  let [order, setOrder] = useState("asc");
  const selectOrder = (property, type) => {
    order === "asc" ? setOrder("desc") : setOrder("asc");

    if (type === "string") {
      let ordered = orderByString(state, property, order);
      setState(ordered);
    }
    if (type === "number") {
      let ordered = orderByNumber(state, property, order);
      setState(ordered);
    }
  };
  console.log("currPage", currentPage[0]?.name);

  return (
    <Box boxShadow="1px 1px 3px 2px #0003">
      <Box
        w="100%"
        h="100%"
        bg="#fff"
        minH="400px"
        maxH="100vh"
        p="1rem"
        overflow="auto"
        {...props}
      >
        <p>{state[0].name}</p>
        <Table variant="simple" py="10px" overflow={"hidden"}>
          <TableHeader headers={headers} onClickOrder={selectOrder} />
          <TableBody items={currentPage} headers={headers}></TableBody>
        </Table>
      </Box>
      <TablePagination arrayItems={state} order={order} handler={setCurrentPage} />
    </Box>
  );
};
