import {
  Box,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MinusCircle } from 'phosphor-react';

export const ShowVariants = ({ allVariants, variant, deleteVariantOption }) => {
  let btn_color = useColorModeValue('#2f2f2f', '#bababa');
  return (
    <Box h="fit-content" w="100%" py="1rem">
      {allVariants[variant].map((item, i) => {
        return (
          <Box
            key={`${item.name} ${i}`}
            display="flex"
            flexDirection="row"
            gap="0.5rem"
            justifyContent="start"
            alignItems="center"
            borderBottom="1px solid #eaeaea"
            py="0.5rem"
          >
            <IconButton
              borderRadius="20px"
              bg="transpatent"
              h="fit-content"
              w="fit-content"
              minW="fit-content"
              color={btn_color}
              _focus={{
                outline: 'none',
                bg: 'transpatent',
              }}
              _hover={{
                bg: 'transpatent',
                color: 'crimson',
              }}
              _active={{
                bg: 'transpatent',
              }}
              onClick={() => deleteVariantOption(variant, item.name)}
              icon={<MinusCircle size={20} weight="bold" />}
            />
            <Text w="40%" as="span">
              {item.name}
            </Text>
            <Text w="25%" as="span">
              Stock: {item.stock}
            </Text>
            <Text w="25%" as="span">
              Sku: {item.sku}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};
