import { Box, IconButton, Input, useColorModeValue } from '@chakra-ui/react';
import { Plus } from 'phosphor-react';
import { useState } from 'react';

export const VariantOptionInput = ({ handleOption, variant }) => {
  const [options, setOptions] = useState({ name: '', stock: '', sku: '' });

  let bg_input = useColorModeValue('#EEEEEE', '#2d3748');
  let border_input = useColorModeValue('none', '1px solid #eeeeee');
  let ph_input = useColorModeValue('#777777', '#bababa');

  const handleChange = (e) => {
    e.preventDefault();
    setOptions({ ...options, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleOption(options, variant);
    setOptions({ name: '', stock: '', sku: '' });
  };
  return (
    <Box
      py="0.5rem"
      display="flex"
      justifyContent="space-between"
      flexDirection={{ base: 'column', sm: 'row' }}
      gap="0.5rem"
    >
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        value={options.name}
        onChange={(e) => handleChange(e)}
        bg={bg_input}
        border={border_input}
        borderRadius={0}
        _placeholder={{ color: ph_input, fontWeight: 600 }}
        _focus={{ border: '2px solid #51a6f5' }}
      />
      <Box display="flex" justifyContent="space-between" gap="0.5rem">
        <Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={options.stock}
          onChange={(e) => handleChange(e)}
          bg={bg_input}
          border={border_input}
          borderRadius={0}
          _placeholder={{ color: ph_input, fontWeight: 600 }}
          _focus={{ border: '2px solid #51a6f5' }}
        />
        <Input
          type="text"
          name="sku"
          placeholder="Sku"
          value={options.sku}
          onChange={(e) => handleChange(e)}
          bg={bg_input}
          border={border_input}
          borderRadius={0}
          _placeholder={{ color: ph_input, fontWeight: 600 }}
          _focus={{ border: '2px solid #51a6f5' }}
        />
        <IconButton
          onClick={(e) => handleSubmit(e)}
          colorScheme="blue"
          borderRadius={3}
          width="20%"
          _focus={{ outline: 'none' }}
          icon={<Plus size={24} weight="bold" />}
        />
      </Box>
    </Box>
  );
};
