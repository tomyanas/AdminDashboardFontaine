import { Box, Button, Text, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Container = ({ children }) => {
  return (
    <Box bg="#fafafa" w="650px" maxW="650px" mx="auto" py="200px">
      {children}
    </Box>
  );
};
// segunda capa _______________________________________________________________________________
/*
{
  v1:[
    {
      name: "",
      stock: "",
      sku: "",
    }
  ],
  
}
*/

export const VariantOptionInput = ({ handleOption, variant }) => {
  const [options, setOptions] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setOptions({ ...options, [e.target.name]: e.target.value });
  };
  // const handleSubmit = () => {
  //   cachito(options, variant);
  // };
  return (
    <Box
      p="0.5rem"
      bg="#fafafa"
      display="flex"
      justifyContent="space-between"
      gap="0.5rem"
    >
      <Input
        type="text"
        name="name"
        value={options.name}
        onChange={(e) => handleChange(e)}
      />
      <Input
        type="text"
        name="stock"
        value={options.stock}
        onChange={(e) => handleChange(e)}
      />
      <Input
        type="text"
        name="sku"
        value={options.sku}
        onChange={(e) => handleChange(e)}
      />
      <Button
        onClick={() => handleOption(options, variant)}
        bg="blue.200"
        color="#fff"
        fontSize="2rem"
        fontWeight="600"
      >
        +
      </Button>
    </Box>
  );
};

// Primera capa ________________________________________________________________________________
/*
{
  v1:[],
  v2:[],
  v3:[],
}
*/

export const InputVariants = () => {
  const [varianteActual, setVarianteActual] = useState("");
  const [allVariants, setAllVariants] = useState({});
  // const [newOption, setNewOption] = useState({});

  const setearOpciones = (nuevaOpcion, variante) => {
    allVariants[variante].push(nuevaOpcion);
    console.log(allVariants);
  };
  const handleSubmit = () => {
    // console.log("var", varianteActual, allVariants);
    setAllVariants({ ...allVariants, [varianteActual]: [] });
    setVarianteActual("");
  };
  return (
    <Box bg="#faaaaa80" h="fit-content" w="100%">
      {/* <form onSubmit={(e) => handleNewVariant(e)}> */}
      <Input
        type="text"
        name="variant"
        value={varianteActual}
        onChange={(e) => setVarianteActual(e.target.value)}
      />
      <Button onClick={handleSubmit}> añadir variante</Button>

      <Box display="flex" gap="10px" flexDirection="column">
        {Object.keys(allVariants)?.map((variant) => {
          console.log("variant", variant);
          return <Text key={variant}>{variant}</Text>;
        })}
      </Box>
      <Box display="flex" gap="10px" flexDirection="column">
        <VariantOptionInput cachito={setearOpciones} variant="color" />
      </Box>
    </Box>
  );
};

export const AddVariant = () => {
  const [open, setOpen] = useState(false);
  const [varianteActual, setVarianteActual] = useState("");
  const [allVariants, setAllVariants] = useState({});
  // const [newOption, setNewOption] = useState({});

  const setearOpciones = (nuevaOpcion, variante) => {
    allVariants[variante].push(nuevaOpcion);
    console.log(allVariants);
  };
  const handleSubmit = () => {
    // console.log("var", varianteActual, allVariants);
    setAllVariants({ ...allVariants, [varianteActual]: [] });
    setVarianteActual("");
  };

  return (
    <Container>
      <Box h="fit-content" w="100%" border="1px solid b5b5b5">
        <Box
          h="fit-content"
          p="0.875rem"
          w="100%"
          borderBottom="1px solid #b5b5b5"
        >
          <Button
            display="block"
            ml="auto"
            bg="gray.200"
            color={open ? "green" : "#2f2f2f"}
            onClick={() => setOpen(!open)}
          >
            + añadir variantes
          </Button>
        </Box>
        {open && (
          <Box
            h="fit-content"
            p="2rem 1rem"
            w="100%"
            borderBottom="1px solid #b5b5b5"
          >
            <Box display="flex" gap="1rem" flexDirection="row">
              <Input
                type="text"
                name="variant"
                placeholder="Nombre de la nueva variante"
                value={varianteActual}
                onChange={(e) => setVarianteActual(e.target.value)}
              />
              <Button bg="blue.400" color="#fafafa" onClick={handleSubmit}>
                Crear
              </Button>
            </Box>

            <Box my="1rem" display="flex" gap="10px" flexDirection="column">
              {Object.keys(allVariants)?.map((variant) => {
                console.log("variant", variant);
                return (
                  <Box
                    border="1px solid black"
                    bg="#a3fa01a2"
                    py="0.5rem"
                    h="fit-content"
                    minH="100px"
                  >
                    <Text
                      as="h3"
                      fontSize="1rem"
                      fontWeight="500"
                      textTransform="capitalize"
                      key={variant}
                    >
                      {variant}:
                    </Text>
                    {allVariants[variant].map((item) => {
                      return (
                        <Box
                          display="flex"
                          flexDirection="row"
                          gap="0.875rem"
                          justifyContent="space-between"
                        >
                          <Text as="span">{item.name}</Text>
                          <Text as="span">{item.stock}</Text>
                          <Text as="span">{item.sku}</Text>
                        </Box>
                      );
                    })}
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
    </Container>
  );
};

// producto = {
//     nombre: "bla",
//     description: "",
//     variantes: {
//       color: [
//          "rojo",
//          "azul",
//          "negro",
//          "verde",
//       ],
//       talle: [
//          "sm",
//          "md",
//          "lg",
//          "xl",
//       ],
//     },
//   };
