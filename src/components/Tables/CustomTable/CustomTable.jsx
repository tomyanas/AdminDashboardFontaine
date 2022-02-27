import { Box, Table } from "@chakra-ui/react";
import { TableBody } from "../TableBody/TableBody";
import { TableHeader } from "../TableHeader/TableHeader";

export const CustomTable = ({ items, headers, ...props }) => {
  return (
    <Box
      w="100%"
      h="100%"
      bg="#fff"
      overflow="auto"
      minH="400px"
      maxH="100vh"
      p="5px"
      boxShadow="1px 1px 3px 2px #0003"
      {...props}
    >
      <Table variant="simple" py="10px" overflow={"hidden"}>
        <TableHeader headers={headers}></TableHeader>
        <TableBody items={items} headers={headers}></TableBody>
      </Table>
    </Box>
  );
};
