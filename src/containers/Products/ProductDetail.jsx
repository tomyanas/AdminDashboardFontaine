import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Section } from "../../components/Sections/Section";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import {
  Box, Center, Container, Divider, FormControl, FormLabel, Heading, IconButton, Image, Link, List, ListItem, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import Slider from "react-slick";

const baseUrl = "https://picsum.photos";

const ProductDetail = () => {
  const [slider, setSlider] = useState(null);
  const db = useDb();
  let { productId } = useParams();
  const [product, setProduct] = useState(null);






 

  
  
  
  
  useEffect(async () => {
    let productDetail = await db.getOneProduct(productId);
    setProduct(productDetail);
  }, []);
  
  
  const [sliderSettings, setSliderSettings] = useState({
    customPaging:  function (i) {
     return  (
        <Box>
          <Link>
            <Image maxW={"100%"}    src={ ""}   />
          </Link>
        </Box>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  })
 

  return (
    <Section>
      <SectionHeader
        title={product ? "Edit: " + product.name : "Edit Product"}
        paddingBottom={"10px"}
        size="lg"
      />
      {product ? (
        <Tabs
          variant="enclosed"
          bg={"#fff"}
          minHeight="400px"
          padding={"1rem"}
          boxShadow="1px 1px 3px 1px #0003"
        >
          <TabList>
            <Tab>Detalle</Tab>
            <Tab>Stock</Tab>
            <Tab>Gallery</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Container
                maxW={"2xl"}
              >

                <SimpleGrid columns={[1, null, 2]} spacing='40px'>
                  <Box>
                    <Box>
                      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                      <style>{cssstyle}</style>

                    </Box>
                    <Box>
                      <Slider {...sliderSettings} ref={(slider) => setSlider(slider)}>
                        <Stack>
                          <Image maxW={"100%"} m={"0 0 1.45rem"} p={"0"} src={baseUrl + `/id/101/400/300`} />
                        </Stack>
                        <Stack>
                          <Image maxW={"100%"} m={"0 0 1.45rem"} p={"0"} src={baseUrl + `/id/102/400/300`} />
                        </Stack>
                        <Stack>
                          <Image maxW={"100%"} m={"0 0 1.45rem"} p={"0"} src={baseUrl + `/id/103/400/300`} />
                        </Stack>
                        <Stack>
                          <Image maxW={"100%"} m={"0 0 1.45rem"} p={"0"} src={baseUrl + `/id/104/400/300`} />
                        </Stack>
                      </Slider>
                    </Box>
                  </Box>
                  <Box>
                    <Center>
                      <Heading as={"span"} color={"blue.800"} fontWeight={'black'} fontSize={"2xl"} >
                        Detalles de producto
                      </Heading>
                    </Center>
                    <Divider />
                    <Stack>
                      <SimpleGrid align={"center"} paddingTop={3} columns={[3, 3]} >
                        <List spacing={3} >
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Nombre:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              Tintura
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Marca:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              Total plus
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Categoria:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              Capilar
                            </Text>
                          </ListItem>
                        </List>
                        <List spacing={3}>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Precio:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              $1,000
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Discount %:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              20
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              SKU:
                            </Text>{'   '}
                            <Text color={"blue.500"} fontWeight={"normal"} fontSize={"smaller"} >
                              354354354
                            </Text>
                          </ListItem>
                        </List>
                        <List spacing={3}>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Act. Stock:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              $1,000
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Stock:
                            </Text>{'   '}
                            <Text color={"blue.600"} fontWeight={"normal"} fontSize={"smaller"} >
                              100
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text color={"blue.800"} fontWeight={'bold'} fontSize={"smaller"} >
                              Min Stock:
                            </Text>{'   '}
                            <Text color={"blue.500"} fontWeight={"normal"} fontSize={"smaller"} >
                              15
                            </Text>
                          </ListItem>
                        </List>
                      </SimpleGrid>
                    </Stack>
                  </Box>
                </SimpleGrid>
                <Center>
                  <Divider m={10} />
                </Center>
                <Box
                  marginTop={-5}
                >
                  <Heading paddingBottom={4} color={"blue.800"} fontWeight={'black'} fontSize={"2xl"} >
                    Descripcion
                  </Heading>

                  <Text color={"grey"} fontWeight={"medium"} fontStyle={"oblique"} fontSize={{ base: '2xl', sm: '4xl', lg: "lg" }} >
                    {product.description}
                  </Text>
                </Box>
              </Container>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <Container maxW={"xs"}>
              <Box>
                <Box>
                  <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                  <style>{cssstyle}</style>

                </Box>
                <Box>
                  <Slider {...sliderSettings} ref={(slider) => setSlider(slider)}>
                    {product.gallery.map((image, index) => (
                      <Stack key={index}>
                        <Image maxW={"100%"} m={"0 0 1.45rem"} p={"0"} src={image} />
                      </Stack>
                    ))}
                  </Slider>
                </Box>
                </Box>
              </Container>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};

const cssstyle = `
.slick-thumb {
    bottom: -35px;
}
.slick-thumb li {
    width: 50px;
    height: 45px;
		cursor: pointer;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
`

export default ProductDetail;
