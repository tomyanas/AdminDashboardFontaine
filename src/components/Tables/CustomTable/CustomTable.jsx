import { Box, Table } from "@chakra-ui/react";
import { TableBody } from "../TableBody/TableBody";
import { TableHeader } from "../TableHeader/TableHeader";
import "./CustomTable.scss";

export const CustomTable = ({ items, headers, ...props }) => {
  return (
    <Box className="custom_table" minHeight="400px" {...props}>
      <Table variant="simple" py="10px" overflow={"hidden"}>
        <TableHeader headers={headers}></TableHeader>
        <TableBody items={items} headers={headers}></TableBody>
      </Table>
    </Box>
  );
};
