import { Box, Container, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import { Section } from "../../components/Sections/Section";
import { useDb } from '../../db/DbProvider';


const Dashboard = () => {

  const { getAllProducts, getAllCustomers } = useDb();

  const [products, setProducts] = useState(null);
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    async function getData() {
      let customers = await getAllCustomers();
      let products = await getAllProducts();
      setCustomers(customers);
      setProducts(products);
    }
    getData();
  },[]);





 

  return (

    <Container maxW={"8xl"} centerContent >
      <Section>
        <SimpleGrid columns={[2, 2, 2, 4]} spacing={5} p={5}  >
          <Box
            border={ "1px solid" }
            borderColor={"gray.300"}
            borderRadius={5}
            boxShadow={"dark-md"}
            p={5}
            width={"100%"}
            height={"150px"}
            bg={useColorModeValue("green.500", "green.500")}
          >
            <Text  
            fontSize={["md", "lg", "xl"]}
            fontWeight={500}
            textAlign={"center"}
            >
              TOTAL DE CLIENTES
            </Text>
            <Text  
            fontSize={"5xl"}
            fontWeight={500}
            textAlign={"center"}
            >
              {customers?.length}
            </Text>

          </Box>
          <Box
          border={ "1px solid" }
          borderColor={"gray.300"}
            borderRadius={5}
            boxShadow={"dark-md"}
            p={5}
            width={"100%"}
            height={"150px"}
            bg={useColorModeValue("red.500", "red.500")}
          >
              <Text  
            fontSize={["md", "lg", "xl"]}
            fontWeight={500}
            textAlign={"center"}
            >
             VENTAS MENSUALES
            </Text>

          </Box>
          <Box
          border={ "1px solid" }
          borderColor={"gray.300"}
            borderRadius={5}
            boxShadow={"dark-md"}
            p={5}
            width={"100%"}
            height={"150px"}
            bg={useColorModeValue("blue.500", "blue.500")}
          >
              <Text  
            fontSize={["md", "lg", "xl"]}
            fontWeight={500}
            textAlign={"center"}
            >
              DEVO. MENUSAL
            </Text>

          </Box>
          <Box
          border={ "1px solid" }
          borderColor={"gray.300"}
            borderRadius={5}
            boxShadow={"dark-md"}
            p={5}
            width={"100%"}
            height={"150px"}
            bg={useColorModeValue("yellow.500", "yellow.500")}
          >
              <Text  
            fontSize={["md", "lg", "xl"]}
            fontWeight={500}
            textAlign={"center"}
            >
              CANT. PRODUCTOS
            </Text>
            <Text  
            fontSize={"5xl"}
            fontWeight={500}
            textAlign={"center"}
            >
              {products?.length}
            </Text>

          </Box>
        </SimpleGrid>
      </Section>
    </Container>
  );
};

export default Dashboard;
