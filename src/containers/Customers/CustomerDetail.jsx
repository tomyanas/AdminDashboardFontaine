import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import Logoimage from "../../assets/image/fontaine.svg";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const CustomerDetail = ({ itemId }) => {
  const { getOneUser } = useDb();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getData(id) {
      let customerDetail = await getOneUser(id);
      setUser(customerDetail);
    }
    getData(itemId);
  }, [itemId, getOneUser]);

  return (
    <Box
      w={"90%"}
      rounded={"md"}
      overflow={"hidden"}
      py={6}
      bg={useColorModeValue("white", "gray.800")}
      mx="auto"
    >
      {user ? (
        <>
          <Box
            bg="gray.300"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="1rem"
          >
            <Image m={0} w={"100%"} src={Logoimage} objectFit={"fill"} />
          </Box>
          <Flex justify={"center"} mt={{ base: -6, sm: -9, md: -12 }}>
            <Avatar
              // size={{base:"xs", md:"xl"}}
              size="xl"
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
              alt={"Author"}
              border="2px solid white"
            />
          </Flex>
          {/* <Stack spacing={0} align={"center"} mb={5} > */}
          <Heading
            p={4}
            textAlign="center"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight={500}
            fontFamily={"body"}
          >
            {user.email}
          </Heading>
          <Text color={"gray.500"} textTransform="capitalize">
            {user.role}
          </Text>
          {/* </Stack> */}

          {/* <Heading textAlign="center" paddingBottom="1.5rem" size="lg">
            {user.name}
          </Heading>

          <Box
            variant="enclosed"
            bg={"#fff"}
            minHeight="400px"
            padding={"1rem"}
            boxShadow="1px 1px 3px 1px #0003"
          >
            <Text>{user.id}</Text>
            <Text>{user.email}</Text>
            <Text>{user.firstName}</Text>
            <Text>{user.lastName}</Text>
            <Text>{user.role}</Text>
          </Box> */}
        </>
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};
export default CustomerDetail;

// const ModalProfile = () => {
//   // const { user } = useAuth();

//   return (
//       <Box
//         w={"90%"}
//         rounded={"md"}
//         overflow={"hidden"}
//         py={6}
//         bg={useColorModeValue("white", "gray.800")}
//       >

//         <Flex justify={"center"} mt={-12}>
//           <Avatar
//             size={"xl"}
//             src={
//               user?.photoURL
//                 ? user.photoURL
//                 : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
//             }
//             alt={"Author"}
//             css={{
//               border: "2px solid white",
//             }}
//           />
//         </Flex>

//         <Box p={6}>
//           <Stack spacing={0} align={"center"} mb={5}>
//             <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
//               {user.email}
//             </Heading>
//             <Text color={"gray.500"}>Administrador</Text>
//           </Stack>
//           <Center>
//             <Button
//               w={"50%"}
//               mt={8}
//               bg={useColorModeValue("#151f21", "gray.900")}
//               color={"white"}
//               rounded={"md"}
//               _hover={{
//                 transform: "translateY(-2px)",
//                 boxShadow: "lg",
//               }}
//             >
//               Modificar Perfil
//             </Button>
//           </Center>
//         </Box>
//       </Box>
//   );
// };


