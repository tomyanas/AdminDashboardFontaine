import { Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Edit } from "../../../assets/icons/Edit";
import { Eye } from "../../../assets/icons/Eye";
import { Trash } from "../../../assets/icons/Trash";
import { DeleleItemMessage } from "../../DeleleItemMessage";
import { CustomDrawer } from "../../Forms/CustomDrawer/CustomDrawer";
import { CustomModal } from "../../Forms/CustomModal/CustomModal";

export const IconButtonBase = ({ icon, ...props }) => {
  return (
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
  );
};

export const TableButtonDelete = ({ onClick, itemId }) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButtonBase
        onClick={onOpen}
        _hover={{
          color: "#ff3636",
        }}
        color={useColorModeValue("#ef4444AA","#ed143ddd")}
        
        icon={<Trash height="1.3rem" />}
      />
      <CustomModal
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeButton={false}
      >
        <DeleleItemMessage
          onClickDelete={() => onClick(itemId, onClose)}
          onClose={onClose}
        />
      </CustomModal>
    </>
  );
};
export const TableButtonEdit = ({ Component, itemId, size }) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButtonBase
        onClick={onOpen}
        _hover={{ color: "#2495ff" }}
        color={useColorModeValue("#4a8ccaAA","#51a6f5")}
        icon={<Edit height="1.3rem" />}
      />
      <CustomDrawer
        isOpen={isOpen}
        onClose={onClose}        
        size={size || "xl"}
      >
        <Component
          // onClickDelete={() => onClick(itemId, onClose)}
          itemId={itemId}
          onClose={onClose}
        />
      </CustomDrawer>
    </>
  );
};
export const TableButtonView = ({ onClick, itemId, Component, size}) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButtonBase
        onClick={onOpen}
        _hover={{ color: "#2495ff" }}
        color={useColorModeValue("#4a8ccaAA","#51a6f5")}
        height="1.3rem"
        icon={<Eye height="1.3rem" />}
      />
      <CustomModal
        size={size || "2xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
        // closeButton={false}
      >
        <Component
          // onClickDelete={() => onClick(itemId, onClose)}
          itemId={itemId}
          onClose={onClose}
        />
      </CustomModal>
    </>
  );
};
