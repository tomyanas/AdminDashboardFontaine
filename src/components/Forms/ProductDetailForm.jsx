import { Uploader } from "./Uploader/Uploader";
import { Box, Center, Container, Divider, FormControl, FormLabel, Heading, IconButton, Image, Link, list, List, ListItem, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Slider from "react-slick";
import * as Yup from "yup";
import {
    CustomButton,
    CustomInput,
    CustomSelect,
} from "./CustomInputs/CustomInputs";
import "./Forms.scss";
import { useDb } from "../../db/DbProvider";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
/*TODO:
Subir imagenes a FB storage
 */

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is Required")
        .max(255, "Max 255 Characters"),
    brand: Yup.string().max(255, "Max 255 Characters"),
    description: Yup.string().max(2000, "Max 2000 Characters"),
    price: Yup.number().required().min(0, "the price should be higher zero"),
    stock: Yup.number().required().min(0, "the stock should be higher zero"),
    minStock: Yup.number()
        .required()
        .min(0, "the min stock should be higher zero"),
    category: Yup.string().required().min(0, "Select a category"),
    gallery: Yup.array().min(1).max(5).required(),
    discountInPercent: Yup.number()
        .min(0, "The discount should be higher zero")
        .max(100, "The discount should be lower one hundred"),

    sku: Yup.string(),
});

const ProductFormEdit = ({ onClose = null }) => {
    const toast = useToast();
    const db = useDb();
    const categories = db.categories;

    const handleSubmit = async (values) => {
        console.log(values)
        let gallery = values.gallery.map((item) => item.path);
        let discountInPercent =
            values.discountInPercent === "" ? 0 : values.discountInPercent;
        let salePrice =
            values.price - (values.price * values.discountInPercent) / 100;
        console.log(salePrice, values.price, values.discountInPercent)
        try {
            let res = await db.addProduct({
                ...values,
                gallery,
                image: gallery[0],
                salePrice,
                discountInPercent,
            });
            if (res) {
                toast({
                    title: res,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error Al Crear.",
                    description: "Intenta nuevamente mas tarde",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
            onClose && onClose();
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        db.getAllCategories();
    }, []);

    return (
        <div className="form_container staff">
            <h2>Edit Product </h2>
            <Formik
                initialValues={{
                    name: "",
                    brand: "",
                    description: "",
                    price: "",
                    category: "",
                    gallery: [],
                    discountInPercent: "",
                    stock: "",
                    minStock: "",
                    sku: "",
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                <Form>
                    <Stack mt={4} spacing={6} direction="column">
                        <FormControl isRequired>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Field
                                name="name"
                                id="name"
                                placeholder="Product Name"
                                component={CustomInput}
                            />
                            <ErrorMessage name="name" component="div" className="error" />
                        </FormControl>
                        {/* _____________________ */}
                        <FormControl>
                            <FormLabel htmlFor="brand">Brand</FormLabel>
                            <Field
                                name="brand"
                                id="brand"
                                placeholder="Brand"
                                component={CustomInput}
                            />
                            <ErrorMessage name="brand" component="div" className="error" />
                        </FormControl>
                        {/* _____________________ */}

                        <FormControl>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Field
                                name="description"
                                id="description"
                                placeholder="Description"
                                component={CustomInput}
                            />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="error"
                            />
                        </FormControl>
                        {/* _____________________ */}

                        <Stack mt={4} spacing={2} direction="row" align="space-between">
                            <FormControl isRequired>
                                <FormLabel htmlFor="price">Price</FormLabel>
                                <Field
                                    name="price"
                                    id="price"
                                    type="number"
                                    placeholder="price"
                                    component={CustomInput}
                                />
                                <ErrorMessage name="price" component="div" className="error" />
                            </FormControl>
                            {/* _____________________ */}
                            <FormControl>
                                <FormLabel htmlFor="discountInPercent">Discount %</FormLabel>
                                <Field
                                    name="discountInPercent"
                                    id="discountInPercent"
                                    type="number"
                                    placeholder="%"
                                    component={CustomInput}
                                />
                                <ErrorMessage
                                    name="discountInPercent"
                                    component="div"
                                    className="error"
                                />
                            </FormControl>
                        </Stack>
                        {/* _____________________ */}

                        <Stack mt={4} spacing={2} direction="row" align="space-between">
                            <FormControl isRequired>
                                <FormLabel htmlFor="category">Category</FormLabel>
                                <Field
                                    name="category"
                                    id="category"
                                    as="select"
                                    placeholder="Select Category"
                                    component={CustomSelect}
                                >
                                    {categories.length &&
                                        categories.map((category) => {
                                            return <option key={category.id}>{category.name}</option>;
                                        })}
                                </Field>
                                <ErrorMessage
                                    name="category"
                                    component="div"
                                    className="error"
                                />
                            </FormControl>
                            {/* _____________________ */}
                            <FormControl>
                                <FormLabel htmlFor="sku">SKU</FormLabel>
                                <Field
                                    name="sku"
                                    id="sku"
                                    placeholder="SKU"
                                    component={CustomInput}
                                />
                                <ErrorMessage name="sku" component="div" className="error" />
                            </FormControl>
                        </Stack>
                        {/* _____________________ */}
                        <Stack mt={4} spacing={2} direction="row" align="space-between">
                            <FormControl isRequired>
                                <FormLabel htmlFor="stock">Stock</FormLabel>
                                <Field
                                    name="stock"
                                    id="stock"
                                    type="number"
                                    placeholder="Stock"
                                    component={CustomInput}
                                />
                                <ErrorMessage name="stock" component="div" className="error" />
                            </FormControl>
                            {/* _____________________ */}
                            <FormControl isRequired>
                                <FormLabel htmlFor="minStock">Min Stock</FormLabel>
                                <Field
                                    name="minStock"
                                    id="minStock"
                                    type="number"
                                    placeholder="Min Stock"
                                    component={CustomInput}
                                />
                                <ErrorMessage
                                    name="minStock"
                                    component="div"
                                    className="error"
                                />
                            </FormControl>
                        </Stack>
                        {/* _____________________ */}

                        <FormControl isRequired>
                            <Uploader name="gallery" maxFiles={5} />
                            <ErrorMessage name="gallery" component="div" className="error" />
                        </FormControl>

                        {/* _____________________ */}

                        <Stack mt={4} spacing={2} direction="row" align="space-between">
                            <CustomButton
                                type="reset"
                                color="red"
                                variant="outline"
                                content="Cancel"
                                onClick={() => onClose && onClose()}
                            />
                            <CustomButton type="submit" content="Add Product" />
                        </Stack>
                    </Stack>
                </Form>
                {/* )} */}
            </Formik>
        </div>
    );
};

const baseUrl = "https://picsum.photos";

const CenterMode = () => {
    const [slider, setSlider] = useState(null);
    const [sliderSettings, setSliderSettings] = useState({
        customPaging: function (i) {
            return (

                <Box>
                    <Link>

                        <Image maxW={"100%"} src={`${baseUrl}/id/10${i + 1}/400/300`} />

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
        <Container
            maxW={"2xl"}
        >

            <SimpleGrid columns={[1, null, 2]} spacing='40px'>
                <Box

                >
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
                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                </Text>
            </Box>

        </Container>


    );
}

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


const AddProductDetail = () => {
    return (
        <Tabs paddingTop={10} isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>Product Detail</Tab>
                <Tab>Edit Product</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <CenterMode />
                </TabPanel>
                <TabPanel>
                    <ProductFormEdit />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}


export default AddProductDetail;