import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Section } from "../../components/Sections/Section";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ProductImageCarousel } from "../../components/Carousel/ProductImageCarousel";

const ProductDetail = () => {
  //   const db = useDb();
  //   let { productId } = useParams();
  //   const [product, setProduct] = useState(null);

  //   useEffect(async () => {
  //     let productDetail = await db.getOneProduct(productId);
  //     setProduct(productDetail);
  //   }, []);
  return (
    <Box
      p="1rem"
      display={"flex"}
      flexDirection="column"
      gap="2rem"
      justifyContent="center"
      alignItems="start"
      w="100%"
    >
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        minHeight="500px"
        height={"fit-content"}
        // bg="#d1d1d1d1"
        alignItems={"Start"}
        gap="2rem"
        p="1rem"
        w="100%"
      >
        <Box w={{ base: "100%", md: "50%" }} h="fit-content">
          <ProductImageCarousel></ProductImageCarousel>
        </Box>
        <Box
         w={{ base: "100%", md: "50%" }} 
          h="100%"
          bg="#FA2a2a5a"
          display={"flex"}
          flexDirection="column"
          gap="0.5rem"
        >
          <Heading>Baby Spinach</Heading>
          <Text as="span"> 2lb </Text>
          <Text>
            Spinach (Spinacia oleracea) is a leafy green flowering plant native
            to central and western Asia. It is of the order Caryophyllales,
            family Amaranthace...
          </Text>
          <Link as="span"> Read more </Link>

          <Heading> $0.60 </Heading>
          <Stack display={"flex"} flexDirection="row">
            <Button> Add To Shipping Cart </Button>
            <Text>10 pieces available</Text>
          </Stack>
          <StackDivider></StackDivider>
          <Text>Categories:</Text>
          <Text>Fruits</Text>
          <Text>Vegetables</Text>
        </Box>
      </Box>
      <Box p="1rem">
        <Heading>Details</Heading>{" "}
        <Text>
          Spinach (Spinacia oleracea) is a leafy green flowering plant native to
          central and western Asia. It is of the order Caryophyllales, family
          Amaranthaceae, subfamily Chenopodioideae. Its leaves are a common
          edible vegetable consumed either fresh.
        </Text>
      </Box>
    </Box>
  );
};
export default ProductDetail;
