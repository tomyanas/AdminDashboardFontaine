import { Thead, Tr} from "@chakra-ui/react";

import { CellHeader } from "./TableCell";

export const TableHeader = ({ headers, onClickOrder, ...props }) => {
  return (
    <Thead >
      <Tr>
        {headers?.map((header, i) => (
          <CellHeader
            header={header}
            key={i}
            onClickOrder={onClickOrder}
            customStylesHeader={header.customStylesHeader}
            {...props }
          />
    
        ))}
      </Tr>
    </Thead>
  );
};

