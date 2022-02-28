import { Box, IconButton, Td, Th } from "@chakra-ui/react";
import { SortAsc } from "../../../assets/icons/SortAsc";
import { SortDesc } from "../../../assets/icons/SortDesc";
import { Sort } from "../../../assets/icons/Sort";
import { Trash } from "../../../assets/icons/Trash";
import { Edit } from "../../../assets/icons/Edit";
import { FilterSolid } from "../../../assets/icons/FilterSolid";

export const CellEditDelete = () => {
  return <Td>hola</Td>;
};
export const CellHeader = ({ header, ...props }) => {
  return (
    <Th
      {...props}
      minW={header.minW ? header.minW : "fit-content"}
      px={2}
      py={3}
      fontSize={"1rem"}
      fontWeight={600}
      color="#161f6a"
      borderLeft={"1px solid #fff"}
    >
      <Box
        minW="fit-content"
        display={"flex"}
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
        gap={"10px"}
        whiteSpace={"nowrap"}
      >
        {header.name}
        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent="space-between"
          gap="3px"
        >
          <IconButton
            w={"fit-content"}
            h={"fit-content"}
            color="#000"
            p={0}
            icon={<Sort height="1.3rem" />}
          />
          <IconButton
            minW={"fit-content"}
            h={"fit-content"}
            color="#000"
            p={0}
            m={0}
            icon={<FilterSolid height="1.2rem" />}
          />
        </Box>
      </Box>
    </Th>
  );
};

export const CellDefaultHeader = ({ header }) => {
  return (
    <Th
      //   {...props}
      minW="150px"
      px={2}
      py={3}
      fontSize={"1rem"}
      fontWeight={600}
      color="#161f6a"
      borderLeft={"1px solid #fff"}
    >
      {header.name}
    </Th>
  );
};
