import { Thead, Tr, Th } from "@chakra-ui/react";
import { CellHeader } from "../TableCell/TableCell";

export const TableHeader = ({ headers }) => {
  return (
    <Thead  borderBottom={"1px solid "} borderBottomColor={"black"}>
      <Tr>
        {headers?.map((header, i) => (
          <CellHeader header={header} key={i} customStyles={header.customStyles}/>
          // <Th
          //   key={i}
          //   minW="150px"
          //   px={2}
          //   py={3}
          //   fontSize={"1rem"}
          //   fontWeight={600}
          //   color="#161f6a"
          //   borderLeft={"1px solid #fff"}
          //   // borderLeftColor={"black"}
          //   // textAlign={"center"}
          // >
          //   {header.name}
          // </Th>
        ))}
      </Tr>
    </Thead>
  );
};
