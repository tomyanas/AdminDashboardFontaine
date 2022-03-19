import React from "react";
import {
  Text,
  Image,
  Button,
  useDisclosure,
  Heading,
  Box,
  Stack,
  Avatar,
  Center,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { UserIcon } from "../../assets/icons/UserIcon";
import { UserAvatar } from "../../assets/icons/UserAvatar";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import Logoimage from "../../assets/image/fontaine.svg";
import Logo from "./Logo";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";

import { useAuth } from "../../auth/AuthProvider";
import { CustomModal } from "../Forms/CustomModal/CustomModal";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";

export const Header = ({ onOpenSidebar }) => {
  // let navigate = useNavigate();
  let auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await auth.logout();
      // navigate("/login");
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={{ base: "1rem", sm: "1rem 2rem" }}
      w="100%"
      bg={useColorModeValue("gray.50", "gray.900")}
      boxShadow={useColorModeValue("0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)", "0 1px 3px 0 rgba(250,250,250,0.1),0 1px 2px 0 rgba(250,250,250,0.06)")}
      zIndex={1}
      sx={{
        "@media only screen and (max-width: 767pxs)": {
          padding: "1rem",
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            "@media only screen and (min-width: 1024px)": {
              display: "none",
            },
          }}
        >
          <Button
            bg={"transparent"}
            onClick={onOpenSidebar}
            _focus={{ outline: "none" }}
          >
            <MenuIcon />
          </Button>
        </Box>
        <Link to="/">
          <Box
            display="block"
            ml={{ base: "0", sm: "1rem" }}
          >
            <Logo height="28px" color={useColorModeValue("#222220", "#fafafa")} />
          </Box>

        </Link>
      </Box>

      <Box display="flex" gap="20px" alignItems="center">
        <DarkModeSwitch display={{ base: "none", sm: "flex" }} />
        <Menu>
          <MenuButton
            as={Button}
            p={0}
            borderRadius="100"
            bg="transparent"
            _focus={{ outline: "none" }}
            color="#b4b4b4"
          >
            {auth.user?.photoURL ? (
              <Image src={auth.user.photoURL} alt="profile image" />
            ) : (
              <UserIcon />
            )}
          </MenuButton>
          <MenuList>
            <MenuGroup title={auth.user?.email}>
              <MenuItem icon={<UserAvatar />} onClick={onOpen}>
                My Account
              </MenuItem>
              <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      <CustomModal Component={ModalProfile} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

const ModalProfile = () => {
  const { user } = useAuth();

  return (
    <Center py={6}>
      <Box
        w={"90%"}
        rounded={"md"}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Stack bg={"gray.300"}>
          {/* <Logo /> */}
          <Image
            alignSelf={"center"}
            h={"120px"}
            w={"90%"}
            src={Logoimage}
            objectFit={"fill"}
          />
        </Stack>
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              user?.photoURL
                ? user.photoURL
                : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.email}
            </Heading>
            <Text color={"gray.500"}>Administrador</Text>
          </Stack>
          <Center>
            <Button
              w={"50%"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Modificar Perfil
            </Button>
          </Center>
        </Box>
      </Box>
    </Center>
  );
};
