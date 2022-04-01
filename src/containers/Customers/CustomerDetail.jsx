import React, { useEffect, useState } from 'react';
import { InLineLoader } from '../../components/InlineLoader/InlineLoader';
import { useDb } from '../../db/DbProvider';
// import Logoimage from '../../assets/image/fontaine.svg';
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Gravatar from 'react-gravatar';

const CustomerDetail = ({ itemId }) => {
  const { getOneUser } = useDb();
  const [user, setUser] = useState(null);
  let bgAvatar = useColorModeValue('white', 'gray.800');
  let titleColor = useColorModeValue('#1F2937', '#eee');
  let textColor = useColorModeValue('#666', '#bbb');
  let subtitleColor = useColorModeValue('gray.800', '#ddd');
  useEffect(() => {
    async function getData(id) {
      let customerDetail = await getOneUser(id);
      setUser(customerDetail);
    }
    getData(itemId);
  }, [itemId, getOneUser]);
  return (
    <Box
      w={'90%'}
      rounded={'md'}
      overflow={'hidden'}
      py={6}
      // bg={useColorModeValue('white', 'gray.800')}
      mx="auto"
    >
      {user ? (
        <>
          {/* <Box
            bg="gray.300"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="1rem"
            borderRadius="10px 10px 0 0px"
          >
            <Image m={0} w={'100%'} src={Logoimage} objectFit={'fill'} />
          </Box> */}
          <Flex justify={'center'}
          //  mt={{ base: -6, sm: -9, md: -12 }}
          >
            <Box
              alt={'Author'}
              border="2px solid #aaa8"
              borderRadius="full"
              overflow="hidden"
              bg={bgAvatar}
            >
              <Gravatar email={user.email} default="robohash" size={150} />
            </Box>
          </Flex>
          <Heading
            p={4}
            textAlign="center"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight={500}
            fontFamily={'body'}
            color={titleColor}
          >
            {user.email}
          </Heading>
          <Box
            display="flex"
            flexDirection={{base:"column", sm:"row"}}
            py="1rem"
            // w={{ base: '100%', sm: '50%', md:"100%" }}
          >
            <Box w="100%" display="flex" flexDirection="column" gap="0.5rem">
              <Text color={textColor} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Role:
                </Text>
                {user.role}
              </Text>
              <Text color={textColor} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Nombre:
                </Text>
                {user.firstName}
              </Text>
              <Text color={textColor} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Apellido:
                </Text>
                {user.lastName}
              </Text>
              <Text color={textColor} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Telefono:
                </Text>
                {user.phoneNumber}
              </Text>
            </Box>
            <Box w="100%" display="flex" flexDirection="column" gap="0.5rem">
              <Text color={user.isVerified ? '#45d17a' : '#df1f43'}  fontWeight={700} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Cuenta Verificada:
                </Text>
                {user.isVerified ? 'Si' : 'No'}
              </Text>
              <Text color={textColor} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Fecha de Registro:
                </Text>
                {user.creationTime}
              </Text>
              <Text color={textColor} textTransform="capitalize">
                <Text
                  as="span"
                  fontWeight={600}
                  color={subtitleColor}
                  pr="0.875rem"
                >
                  Direccion:
                </Text>
                {user.address}
              </Text>
            </Box>
          </Box>
        </>
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};
export default CustomerDetail;
