import {
    Thead,
    Tr,
    Th,
  } from "@chakra-ui/react";
  
  export const TableHeader = ({ headers }) => {
    return (
      <Thead bg="#F2F2F2"  borderBottom={"1px solid "} borderBottomColor={"black"}>
        <Tr>
          {headers?.map((header, i) => (
            <Th key={i} minW="150px" px={2} py={3} fontWeight={700} color="black">{header.name}</Th>
          ))}
        </Tr>
      </Thead>
    );
  };

  