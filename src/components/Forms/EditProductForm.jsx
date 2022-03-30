import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import {
    Box,
    ButtonGroup,
    SimpleGrid,
    Stack,
    Center,
    Heading,
} from "@chakra-ui/react";
import {

    InputControl,
    NumberInputControl,
    PercentComplete,
    ResetButton,
    SelectControl,
    SubmitButton,
    TextareaControl
} from "formik-chakra-ui";

import { Formik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
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
    /*  gallery: Yup.array().min(1).max(5).required(), */
    discountInPercent: Yup.number()
        .min(0, "The discount should be higher zero")
        .max(100, "The discount should be lower one hundred"),
    sku: Yup.string(),
});

const EditProductForm = ({ itemId }) => {
    const [product, setProduct] = useState(null);
    const {
        getAllProducts,
        getOneProduct,
        updateProduct,
        categories,
        GenericToastSuccess,
        GenericToastError
    } = useDb();

    useEffect(() => {
        async function getData(id) {
            let productDetail = await getOneProduct(id);
            setProduct(productDetail);
        }
        getData(itemId)
    }, [itemId]);


    const handleOnSubmit = async (event, values) => {
        event.preventDefault();
        try {
            values.salePrice = Math.ceil((values.price - (values.price * values.discountInPercent) / 100) * 100) / 100

            await updateProduct(itemId, values);
            GenericToastSuccess("El producto se actualizo correctamente");
            getAllProducts();
        } catch (error) {
            GenericToastError("Error Al hacer el update", "Intenta nuevamente mas tarde");
            console.log(error);
        }
    };

    return (
        <Box>
                <Heading as="h1" size="xl" textAlign="center" marginTop={10}>
                
                    Editar Producto
                </Heading>
            {product ? (
                <Formik
                    initialValues={{
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        discountInPercent: product.discountInPercent,
                        minStock: product.minStock,
                        name: product.name,
                        price: product.price,
                        salePrice: product.salePrice,
                        sku: product.sku,
                        stock: product.stock,
                    }}
                    onSubmit={handleOnSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, errors }) => (
                        <Box
                            p={5}
                           
                            rounded="lg"
                       
                            maxWidth={800}
                            spacing={10}
                            m=" auto"
                            as="form"
                            onSubmit={(event) => handleOnSubmit(event, values)}
                        >
                            <Stack
                                spacing={8}
                                >
                                <InputControl name="brand" label="Marca" />
                                <SelectControl
                                    name="category"  label="Categoria"
                                    selectProps={{ placeholder: product.category }}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </SelectControl>
                                <TextareaControl name="description" label="Descripcion" />
                                <SimpleGrid columns={[1, null, 2]} spacing={10} >
                                    <NumberInputControl name="discountInPercent" label="Descuento %" />
                                    <NumberInputControl name="price" label="Precio" />
                                </SimpleGrid>
                                <SimpleGrid columns={[1, null, 2]} spacing={10} >
                                    <NumberInputControl name="stock" label="Stock" />
                                    <NumberInputControl name="minStock" label="Stock Minimo" />
                                </SimpleGrid>
                                <InputControl name="sku" label="Sku" inputMode="text" />
                                <Center>
                                    <PercentComplete />
                                    <ButtonGroup
                                       
                                    >
                                        <SimpleGrid columns={[1, null, 2]} spacing={5} >
                                        <ResetButton
                                        width={"100%"}
                                        color="red.200"
                                        
                                        variant="outline"
                                        fontWeight={600}
                                        >Reset</ResetButton>
                                        <SubmitButton 
                                         bg={}
                                         disabled={Object.keys(errors).length}
                                         width={"280px"}
                                         >Editar Producto</SubmitButton>
                                        </SimpleGrid>
                                    </ButtonGroup>
                                </Center>
                            </Stack>
                        </Box>
                    )}
                </Formik>
            ) : (
                <InLineLoader />
            )
            }
        </Box>
    );
};



export default EditProductForm;