import { Box, Image, Td, Th } from "@chakra-ui/react";
import { SortAsc } from "../../../assets/icons/SortAsc";
import { SortDesc } from "../../../assets/icons/SortDesc";
import { Sort } from "../../../assets/icons/Sort";
import { FilterSolid } from "../../../assets/icons/FilterSolid";
import { FilterOutline } from "../../../assets/icons/FilterOutline";
import {
  IconButtonBase,
  TableButtonDelete,
  TableButtonEdit,
  TableButtonView,
} from "./ActionButtons";

const TdBase = ({ children, ...props }) => {
  return (
    <Td
      minW={"fit-content"}
      h={"fit-content"}
      w={"fit-content"}
      borderColor="#dee2e6"
      color="#495057"
      p={0}
      m={0}
      bg="transparent"
      {...props}
    >
      {children}
    </Td>
  );
};
const ThBase = ({ children, ...props }) => {
  return (
    <Th
      minW={"fit-content"}
      h={"fit-content"}
      w={"fit-content"}
      color="#343a40"
      p={0}
      m={0}
      bg="transparent"
      borderColor="#dee2e6"
      fontSize={"0.875rem"}
      fontWeight={700}
      textTransform="none"
      {...props}
    >
      {children}
    </Th>
  );
};

export const CellActions = ({
  header: { onClickDelete, edit, view, columnWidth },
  itemId,
  customStyles = false,
}) => {

  return (
    <TdBase w={columnWidth}>
      <Box
        w={"100%"}
        maxW={"120px"}
        h={"100%"}
        p={2}
        display={"flex"}
        justifyContent="space-around"
        gap={"3px"}
        sx={customStyles ? customStyles : {}}
      >
        {onClickDelete && (
          <TableButtonDelete onClick={onClickDelete} itemId={itemId} />
        )}

        {edit?.Component && (
          <TableButtonEdit
            Component={edit.Component}
            itemId={itemId}
            size={edit.size}
          />
        )}
        {view?.Component && (
          <TableButtonView
            Component={view.Component}
            itemId={itemId}
            size={view.size}
          />
        )}
      </Box>
    </TdBase>
  );
};

export const CellHeader = ({
  onClickOrder,
  header,
  customStylesHeader = false,
  ...props
}) => {
  return (
    <ThBase w={header.columnWidth}>
      <Box
        borderTop={"1px solid #dee2e6"}
        borderBottom={"1px solid #dee2e6"}
        bg="#f8f9fa"
        p="0.875rem"
        minW="fit-content"
        display={"flex"}
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
        gap={"10px"}
        whiteSpace={"nowrap"}
        _hover={{
          bg: "#e9ecef",
        }}
        // _active={{
        //   bg: "transpatent",
        // }}

        sx={customStylesHeader ? customStylesHeader : {}}
        {...props}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems={"center"}
          gap="3px"
        >
          {header.name}
          {/* <IconButtonBase icon={<SortDesc height="1rem" />} /> */}
          {/* <IconButtonBase icon={<SortAsc height="1rem" />} /> */}
          {header.order && (
            <IconButtonBase
              icon={<Sort height="1rem" />}
              onClick={
                onClickOrder
                  ? () => onClickOrder(header.property, header.order)
                  : () => {}
              }
            />
          )}
        </Box>
        {header.filter && (
          <IconButtonBase icon={<FilterOutline height="1rem" />} />
        )}
      </Box>
    </ThBase>
  );
};
export const CellPrice = ({ header, row, ...props }) => {
  return (
    <TdBase w={header.columnWidth}>
      <Box
        bg="transparent"
        p="0.875rem"
        minW="fit-content"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        fontWeight={600}
        sx={header.customStyles ? header.customStyles : {}}
        {...props}
      >
        {row[header.property] === undefined || row[header.property] === null
          ? "No Value"
          : `$ ${row[header.property]}`}
      </Box>
    </TdBase>
  );
};
export const CellPercent = ({ header, row, ...props }) => {
  return (
    <TdBase w={header.columnWidth}>
      <Box
        bg="transparent"
        p="0.875rem"
        minW="fit-content"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        fontWeight={600}
        sx={header.customStyles ? header.customStyles : {}}
        {...props}
      >
        {row[header.property] === undefined || row[header.property] === null
          ? "No Value"
          : `${row[header.property]} %`}
      </Box>
    </TdBase>
  );
};
export const CellImage = ({ header, row, ...props }) => {
  let url_image =
    row[header.property] ||
    "https://firebasestorage.googleapis.com/v0/b/fontaine-dev.appspot.com/o/logo-square.jpg?alt=media&token=f1b1b8d0-a08d-4f9c-9798-e4eb3b4a95d8";
  return (
    <TdBase w={header.columnWidth}>
      <Box
        p="0.5rem"
        minW="fit-content"
        display={"flex"}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={header.customStyles ? header.customStyles : {}}
        {...props}
      >
        <Image h={"40px"} w={"40px"} src={url_image} alt="img" />
      </Box>
    </TdBase>
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
