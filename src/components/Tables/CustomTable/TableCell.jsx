import { Box, Image, useColorModeValue } from '@chakra-ui/react';
import Gravatar from 'react-gravatar';
import {
  TableButtonDelete,
  TableButtonEdit,
  TableButtonView,
} from './ActionButtons';

export const CellActions = ({ edit, view, onClickDelete, data }) => {
  return (
    <Box
      w={'100%'}
      maxW={'120px'}
      h={'100%'}
      p={2}
      display={'flex'}
      justifyContent="space-around"
      alignItems="center"
      gap={'3px'}
    >
      {onClickDelete && (
        <TableButtonDelete onClick={onClickDelete} itemId={data} />
      )}

      {edit?.Component && (
        <TableButtonEdit
          Component={edit.Component}
          itemId={data}
          size={edit.size}
        />
      )}
      {view?.Component && (
        <TableButtonView
          Component={view.Component}
          itemId={data}
          size={view.size}
        />
      )}
    </Box>
  );
};
export const CellImage = ({ data, ...props }) => {
  let url_image =
    data ||
    'https://firebasestorage.googleapis.com/v0/b/fontaine-dev.appspot.com/o/logo-square.jpg?alt=media&token=f1b1b8d0-a08d-4f9c-9798-e4eb3b4a95d8';
  return (
    <Box
      // p="0.5rem"
      w="100%"
      minW="fit-content"
      display={'flex'}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Image h={'40px'} w={'40px'} src={url_image} alt="img" />
    </Box>
  );
};
export const CellAvatar = ({ data, ...props }) => {
  
  return (
    <Box
      // p="0.5rem"
      w="100%"
      minW="fit-content"
      display={'flex'}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Box
        h={'40px'}
        w={'40px'}
        alt={'Author'}
        border="2px solid #aaa8"
        borderRadius="full"
        overflow="hidden"
      >
        <Gravatar email={data} default="robohash" size={40} />
      </Box>
    </Box>
  );
};
