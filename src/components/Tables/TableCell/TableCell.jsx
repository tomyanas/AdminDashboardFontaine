import {
  Box,
  Button,
  IconButton,
  Td,
  Th,
  useDisclosure,
} from "@chakra-ui/react";
import { SortAsc } from "../../../assets/icons/SortAsc";
import { SortDesc } from "../../../assets/icons/SortDesc";
import { Sort } from "../../../assets/icons/Sort";
import { Trash } from "../../../assets/icons/Trash";
import { Edit } from "../../../assets/icons/Edit";
import { Eye } from "../../../assets/icons/Eye";
import { FilterSolid } from "../../../assets/icons/FilterSolid";
import { FilterOutline } from "../../../assets/icons/FilterOutline";
import { DeleleItemMessage } from "../../DeleleItemMessage";
import { CustomModal } from "../../Forms/CustomModal/CustomModal";

const IconButtonBase = ({ icon, ...props }) => {
  return (
    <>
      <Button
        _focus={{
          outline: "none",
          bg: "transparent",
        }}
        _hover={{
          bg: "transparent",
          color: "#333",
        }}
        _active={{
          bg: "transpatent",
        }}
        minW={"fit-content"}
        h={"fit-content"}
        color="#666"
        p={0}
        m={0}
        bg="transparent"
        {...props}
      >
        {icon}
      </Button>
    </>
  );
};
const TdBase = ({ children, ...props }) => {
  return (
    <Td
      minW={"fit-content"}
      h={"fit-content"}
      w={"fit-content"}
      color="#4E4E4E"
      borderColor="#dee2e6"
      color="#f8f9fa"
      p={0}
      m={0}
      bg="transparent"
      {...props}
    >
      {children}
    </Td>
  );
};
const ThBase = ({ children,  ...props }) => {
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
  header: { onClickDelete, onClickEdit , onClickView},
  itemId,
  customStyles = false,
}) => {
  let { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <TdBase w="100px">
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
          <IconButtonBase
            onClick={onOpen}
            _hover={{
              color: "#ff3636",
            }}
            color="#ef4444AA"
            icon={<Trash height="1.3rem" />}
          />
        )}
        {onClickEdit && (
          <IconButtonBase
            onClick={() => onClickEdit(itemId)}
            _hover={{ color: "#2495ff" }}
            color="#4a8ccaAA"
            icon={<Edit height="1.3rem" />}
          />
        )}
        {onClickView && (
          <IconButtonBase
            onClick={() => onClickView(itemId)}
            _hover={{ color: "#2495ff" }}
            color="#4a8ccaAA"
            height="1.3rem"
            icon={<Eye height="1.3rem" />}
          />
        )}
      </Box>
      <CustomModal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeButton={false}
      >
        <DeleleItemMessage
          onClickDelete={() => onClickDelete(itemId, onClose)}
          onClose={onClose}
        />
      </CustomModal>
    </TdBase>
  );
};
export const CellHeader = ({ header, customStyles = false, ...props }) => {
  return (
    <ThBase>
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

        sx={customStyles ? customStyles : {}}
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
          {header.order && <IconButtonBase icon={<Sort height="1rem" />} />}
        </Box>
        {header.filter && (
          <IconButtonBase icon={<FilterOutline height="1rem" />} />
        )}
      </Box>
    </ThBase>
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
