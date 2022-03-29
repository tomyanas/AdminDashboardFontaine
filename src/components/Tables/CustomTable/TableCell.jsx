import { Box, Image} from '@chakra-ui/react';
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
