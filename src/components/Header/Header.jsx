import React from 'react';
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
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MenuIcon } from '../../assets/icons/MenuIcon';
import { UserIcon } from '../../assets/icons/UserIcon';
import { UserAvatar } from '../../assets/icons/UserAvatar';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';
import Logo from './Logo';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from '@chakra-ui/react';

import { useAuth } from '../../auth/AuthProvider';
import DarkModeSwitch from '../DarkModeSwitch/DarkModeSwitch';
import EditProfile from '../Forms/EditProfile';
import Gravatar from 'react-gravatar';

export const Header = ({ onOpenSidebar }) => {
  const { user } = useAuth();
  let auth = useAuth();
  const { isOpen: abierto, onOpen: abrir, onClose: cerrar } = useDisclosure();

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={{ base: '1rem', sm: '1rem 2rem' }}
      w="100%"
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow={useColorModeValue(
        '0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)',
        '0 1px 3px 0 rgba(250,250,250,0.1),0 1px 2px 0 rgba(250,250,250,0.06)'
      )}
      zIndex={1}
      sx={{
        '@media only screen and (max-width: 767pxs)': {
          padding: '1rem',
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            '@media only screen and (min-width: 1024px)': {
              display: 'none',
            },
          }}
        >
          <Button
            bg={'transparent'}
            onClick={onOpenSidebar}
            _focus={{ outline: 'none' }}
          >
            <MenuIcon />
          </Button>
        </Box>
        <Link to="/">
          <Box display="block" ml={{ base: '0', sm: '1rem' }}>
            <Logo
              height="28px"
              color={useColorModeValue('#222220', '#fafafa')}
            />
          </Box>
        </Link>
      </Box>

      <Box display="flex" gap="20px" alignItems="center">
        <DarkModeSwitch display={{ base: 'none', sm: 'flex' }} />
        <Menu>
          <MenuButton
            as={Button}
            p={0}
            borderRadius="100"
            bg="transparent"
            _focus={{ outline: 'none' }}
            color="#b4b4b4"
          >
            <Box
              alt={'Author'}
              border="2px solid #aaa8"
              borderRadius="full"
              overflow="hidden"
              bg={useColorModeValue('white', 'gray.800')}
            >
              <Gravatar email={auth.user?.email} default="robohash" size={40} />
            </Box>
            {/* {auth.user?.photoURL ? (
              <Image src={auth.user.photoURL} alt="profile image" />
            ) : (
              <UserIcon />
            )} */}
          </MenuButton>
          <MenuList
            bg={useColorModeValue('#efefef', '#2d3748')}
            boxShadow={useColorModeValue(
              '1px 1px 3px 1px #0003',
              '0px 0px 2px 0px #e9e9e933'
            )}
          >
            <Center py={6}>
              <Box w="100%" rounded="md">
                <Flex justify={'center'}>
                  {/* <Avatar
                    size={'xl'}
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                    }
                    alt={'Author'}
                    border={useColorModeValue(
                      '2px solid #999',
                      '2px solid white'
                    )}
                  /> */}
                  <Box
                    alt={'Author'}
                    border="2px solid #aaa8"
                    borderRadius="full"
                    overflow="hidden"
                    bg={useColorModeValue('white', 'gray.800')}
                  >
                    <Gravatar
                      email={auth.user?.email}
                      default="robohash"
                      size={100}
                    />
                  </Box>
                </Flex>

                <Box p={6} pb={2}>
                  <Stack spacing={0} align={'center'}>
                    <Heading
                      fontSize={'2xl'}
                      fontWeight={500}
                      fontFamily={'body'}
                    >
                      {user.email}
                    </Heading>
                    <Text color={'gray.500'}>Administrador</Text>
                  </Stack>
                </Box>
              </Box>
            </Center>
            <Divider mb={5} />
            <MenuGroup>
              <MenuItem
                _hover={useColorModeValue({ bg: '#fafafa' }, { bg: '#292e37' })}
                icon={<UserAvatar />}
                onClick={abrir}
              >
                Editar Perfil
              </MenuItem>
              <MenuItem
                icon={<LogoutIcon />}
                onClick={handleLogout}
                _hover={useColorModeValue({ bg: '#fafafa' }, { bg: '#292e37' })}
              >
                Cerrar Sesión
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      <EditProfile isOpen={abierto} onClose={cerrar} />
    </Box>
  );
};
