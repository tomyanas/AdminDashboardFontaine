import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const CategoryDetail = ({ itemId }) => {
  const { getOneCategory } = useDb();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function getData(id) {
      let customerDetail = await getOneCategory(id);
      setCategory(customerDetail);
    }
    getData(itemId);
  }, [itemId, getOneCategory]);

  return (
    <Box p="2rem 1rem">
      {category ? (
        <>
          <Heading textAlign="center" paddingBottom="1.5rem" size="lg">
            {category.name}
          </Heading>

          <Box
            variant="enclosed"
            bg={"#fff"}
            minHeight="400px"
            padding={"1rem"}
            boxShadow="1px 1px 3px 1px #0003"
          >
            <Text>{category.id}</Text>
            <Text>{category.name}</Text>
            <Image src={category.image} />
          </Box>
        </>
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};
export default CategoryDetail;
