import {
  Box,
  Button,
  Text,
  Input,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Minus, Plus } from 'phosphor-react';
import { Trash } from '../../../assets/icons/Trash';
import { VariantOptionInput } from './VariantOptionInput';
import { ShowVariants } from './VariantList';
import { useField } from 'formik';

export const AddVariant = ({ name }) => {
  const [_, __, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [varianteActual, setVarianteActual] = useState('');
  const [allVariants, setAllVariants] = useState({});
  let bg_input = useColorModeValue('#EEEEEE', '#2d3748');
  let border_input = useColorModeValue('none', '1px solid #eeeeee');
  let ph_input = useColorModeValue('#777777', '#bababa');
  let color_trashbtn = useColorModeValue('#2f2f2f', '#bababa');

  const setearOpciones = (nuevaOpcion, variante) => {
    setAllVariants({
      ...allVariants,
      [variante]: [...allVariants[variante], nuevaOpcion],
    });
  };
  const handleSubmit = () => {
    setAllVariants({ ...allVariants, [varianteActual]: [] });
    setVarianteActual('');
  };
  const deleteVariant = (variant) => {
    setAllVariants((state) => {
      delete state[variant];
      return { ...state };
    });
  };
  const deleteVariantOption = (variant, name) => {
    setAllVariants((state) => {
      let filteredVariants = state[variant].filter(
        (item) => item.name !== name
      );
      return { ...state, [variant]: filteredVariants };
    });
  };

  useEffect(() => {
    helpers.setValue(allVariants);
  }, [allVariants]);

  return (
    <Box h="fit-content" w="100%" borderBottom={useColorModeValue("1px solid #e6e6e6","1px solid #bababa")}>
      <Box h="fit-content" p="0" w="100%">
        <Button
          onClick={() => setOpen(!open)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="auto"
          bg="transpatent"
          color={useColorModeValue('#2f2f2f', '#eeeeee')}
          _focus={{
            outline: 'none',
            bg: 'transpatent',
          }}
          _hover={{
            bg: 'transpatent',
          }}
          _active={{
            bg: 'transpatent',
          }}
          leftIcon={open ? <Minus size={14} /> : <Plus size={14} />}
        >
          Agregar variantes
        </Button>
      </Box>
      {open && (
        <Box h="fit-content" py="1rem" w="100%">
          {Object.keys(allVariants).length < 1 && (
            <Box display="flex" gap="1rem" flexDirection="row">
              <Input
                type="text"
                name={name}
                placeholder="¿Qué característica hace variar a tu producto?"
                value={varianteActual}
                onChange={(e) => setVarianteActual(e.target.value)}
                bg={bg_input}
                borderRadius={0}
                border={border_input}
                _placeholder={{
                  color: ph_input,
                  fontWeight: 600,
                }}
                _focus={{ border: '2px solid #51a6f5' }}
              />
              <Button
                colorScheme="blue"
                borderRadius={3}
                width="20%"
                _focus={{ outline: 'none' }}
                onClick={handleSubmit}
              >
                Crear
              </Button>
            </Box>
          )}
          <Box display="flex" gap="10px" flexDirection="column">
            {Object.keys(allVariants)?.map((variant) => {
              return (
                <Box
                  key={variant}
                  py="0.5rem"
                  h="fit-content"
                  minH="100px"
                  position="relative"
                >
                  <Text
                    as="h3"
                    fontSize="1.2rem"
                    fontWeight="400"
                    textTransform="capitalize"
                    key={variant}
                  >
                    ¿Qué opciones de {variant} tenés?
                  </Text>
                  <IconButton
                    position="absolute"
                    top="0"
                    right="0"
                    bg="transpatent"
                    color={color_trashbtn}
                    _focus={{
                      outline: 'none',
                      bg: 'transpatent',
                    }}
                    _hover={{
                      color: 'crimson',
                      bg: 'transpatent',
                    }}
                    _active={{
                      bg: 'transpatent',
                    }}
                    onClick={() => deleteVariant(variant)}
                    icon={<Trash />}
                  />
                  <ShowVariants
                    allVariants={allVariants}
                    deleteVariantOption={deleteVariantOption}
                    variant={variant}
                  />

                  <VariantOptionInput
                    handleOption={setearOpciones}
                    variant={variant}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
