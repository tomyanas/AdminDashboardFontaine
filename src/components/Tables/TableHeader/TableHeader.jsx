import { Thead, Tr } from "@chakra-ui/react";
import { CellHeader } from "../TableCell/TableCell";

export const TableHeader = ({ headers }) => {
  return (
    <Thead borderBottom={"1px solid "} borderBottomColor={"black"}>
      <Tr>
        {headers?.map((header, i) => (
          <CellHeader
            header={header}
            key={i}
            customStylesHeader={header.customStylesHeader}
          />
        ))}
      </Tr>
    </Thead>
  );
};
