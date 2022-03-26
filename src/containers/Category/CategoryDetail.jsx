import React, { useEffect, useState } from 'react';
import { InLineLoader } from '../../components/InlineLoader/InlineLoader';
import { useDb } from '../../db/DbProvider';
import { Box, Divider, Heading, Image, Text } from '@chakra-ui/react';
import { Tag } from 'phosphor-react';

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
  console.log(category);
  return (
    <Box
      p="1rem"
      display={'flex'}
      flexDirection="column"
      gap="1rem"
      justifyContent="center"
      alignItems="start"
      w="100%"
    >
      {category ? (
        <Box
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          minHeight="400px"
          height={'fit-content'}
          alignItems={'Start'}
          gap="2rem"
          p="3rem 1rem"
          w="100%"
        >
          <Box
            w={{ base: '100%', md: '50%' }}
            h="fit-content"
            position="relative"
          >
            <Image
              src={
                category.image ||
                'https://firebasestorage.googleapis.com/v0/b/fontaine-dev.appspot.com/o/logo-square.jpg?alt=media&token=f1b1b8d0-a08d-4f9c-9798-e4eb3b4a95d8'
              }
            />
          </Box>
          <Box
            w={{ base: '100%', md: '50%' }}
            h="100%"
            display={'flex'}
            flexDirection="column"
            px={{ base: '0', lg: '2rem' }}
            pt="1rem"

            // gap="0.5rem"
          >
            <Heading
              size="md"
              fontFamily="Open Sans"
              color="#1F2937"
              fontWeight={600}
              textTransform="capitalize"
            >
              {category.name}
            </Heading>

            <Box fontSize="14px" color="#6b7280" my="16px">
              Slug: {category.slug}
            </Box>

            <Divider />
            <Box mt="12px" display="flex" flexDirection="row">
              <Text mr="1.5rem">
                Subcategorias:{' '}
                {category.subcategory?.length &&
                  category.subcategory.map((item) => (
                    <Tag textTransform="capitalize" mx="6px">
                      {item}
                    </Tag>
                  ))}
              </Text>
            </Box>
          </Box>
        </Box>
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};
export default CategoryDetail;
