import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import {
  Box,
  Divider,
  Heading,
  Text,
  Tag,
} from "@chakra-ui/react";
import { ProductImageCarousel } from "../../components/Carousel/ProductImageCarousel";

const ProductDetail = ({ itemId }) => {
  const { getOneProduct } = useDb();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getData = async (id) => {
      let productDetail = await getOneProduct(id);
      setProduct(productDetail);
    };
    getData(itemId);
  }, [itemId, getOneProduct]);
  console.log(product);
  return (
    <Box
      p="1rem"
      display={"flex"}
      flexDirection="column"
      gap="1rem"
      justifyContent="center"
      alignItems="start"
      w="100%"
    >
      {product ? (
        <>
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            minHeight="500px"
            height={"fit-content"}
            alignItems={"Start"}
            gap="2rem"
            p="3rem 1rem"
            w="100%"
          >
            <Box
              w={{ base: "100%", md: "50%" }}
              h="fit-content"
              position="relative"
            >
              {product.discountInPercent > 0 && (
                <Tag
                  size="sm"
                  borderRadius="1rem"
                  color="#FFF"
                  bg="#EAB308"
                  position="absolute"
                  top="5px"
                  right="5px"
                  zIndex="2"
                  fontWeight="bold"
                  p="6px 12px"
                >
                  {product.discountInPercent} %
                </Tag>
              )}
              <ProductImageCarousel images={product.gallery} />
            </Box>
            <Box
              w={{ base: "100%", md: "50%" }}
              h="100%"
              display={"flex"}
              flexDirection="column"
              px={{ base: "0", lg: "2rem" }}
              // gap="0.5rem"
            >
              <Heading
                size="md"
                fontFamily="Open Sans"
                color="#1F2937"
                fontWeight={600}
              >
                {product.name}
              </Heading>
              <Text as="span" fontSize="14px" color="#6b7280" marginTop="12px">
                2 lb
              </Text>
              <Box fontSize="14px" color="#6b7280" marginTop="16px">
                {product.description.slice(0, 150) + " ..."}
              </Box>
              {/* <Link as="span"> Read more </Link> */}

              <Box display="flex" my="40px">
                <Text
                  as="span"
                  fontSize="30px"
                  fontWeight="600"
                  color="#4a8cca"
                  marginRight="12px"
                >
                  $ {Math.ceil(product.salePrice * 100) / 100}
                </Text>

                <Text as="del" fontSize="16px" color="#9ca3af" marginTop="12px">
                  $ {Math.ceil(product.price * 100) / 100}
                </Text>
              </Box>
              <Divider />
              <Box mt="12px" display="flex" flexDirection="row">
                <Text mr="1.5rem">
                  Stock: <Tag>{product.stock}.u</Tag>
                </Text>
                <Text mr="1.5rem">
                  Stock Minimo: <Tag>{product.minStock}.u</Tag>
                </Text>
              </Box>
              <Box mt="12px" display="flex" flexDirection="row">
                <Text mr="12px">Categories:</Text>
                <Tag>{product.category}</Tag>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box p="1rem">
            <Heading
              fontFamily="Open Sans"
              fontSize="18px"
              color="#1F2937"
              fontWeight={600}
              mb="1.5rem"
            >
              Details
            </Heading>
            <Text
              fontSize="14px"
              color="#6b7280"
              marginTop="16px"
              whiteSpace="pre-wrap"
            >
              {product.description}
            </Text>
          </Box>
        </>
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};
export default ProductDetail;
