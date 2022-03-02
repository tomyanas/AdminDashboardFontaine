import { Thead, Tr, Th, Box } from "@chakra-ui/react";
import { FilterOutline } from "../../../assets/icons/FilterOutline";
import { Sort } from "../../../assets/icons/Sort";
import { CellHeader, IconButtonBase } from "../TableCell/TableCell";

export const TableHeader = ({ headers, onClickOrder, ...props }) => {
  return (
    <Thead borderBottom={"1px solid "} borderBottomColor={"black"}>
      <Tr>
        {headers?.map((header, i) => (
          <CellHeader
            header={header}
            key={i}
            onClickOrder={onClickOrder}
            customStylesHeader={header.customStylesHeader}
          />
    
        ))}
      </Tr>
    </Thead>
  );
};


