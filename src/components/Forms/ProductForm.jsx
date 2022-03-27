import { Uploader } from './Uploader/Uploader';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTextarea,
} from './CustomInputs/CustomInputs';
import { useDb } from '../../db/DbProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddVariant } from './AddVariant/AddVariant';
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is Required')
    .max(255, 'Max 255 Characters'),
  brand: Yup.string().max(255, 'Max 255 Characters'),
  description: Yup.string().max(2000, 'Max 2000 Characters'),
  price: Yup.number().required().min(0, 'the price should be higher zero'),
  stock: Yup.number().required().min(0, 'the stock should be higher zero'),
  minStock: Yup.number()
    .required()
    .min(0, 'the min stock should be higher zero'),
  category: Yup.string().required().min(0, 'Select a category'),
  gallery: Yup.array().min(1).max(5).required(),
  discountInPercent: Yup.number()
    .min(0, 'The discount should be higher zero')
    .max(100, 'The discount should be lower one hundred'),

  sku: Yup.string(),
});

const AddProductForm = ({ onClose = null }) => {
  const {
    GenericToastSuccess,
    GenericToastError,
    onUpload,
    addProduct,
    getAllCategories,
    categories,
  } = useDb();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    let gallery = [];
    try {
      for (const item of values.gallery) {
        let url = await onUpload('products/', item);
        gallery.push(url);
      }
      let discountInPercent =
        values.discountInPercent === '' ? 0 : values.discountInPercent;
      let salePrice =
        values.price - (values.price * values.discountInPercent) / 100;

      let res = await addProduct({
        ...values,
        gallery,
        image: gallery[0],
        salePrice,
        discountInPercent,
      });
      res
        ? GenericToastSuccess(res)
        : GenericToastError('Error Al Crear.', 'Intenta nuevamente mas tarde');
      onClose && onClose();
      navigate('/products');
    } catch (error) {
      console.error(error);
      GenericToastError('Error Al Crear.', 'Intenta nuevamente mas tarde');
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Box bg={'trasnparent'} p={'20px'}>
      <Heading as="h2" my={'20px'} textAlign={'center'} size="xl">
        Crear Nuevo Producto
      </Heading>
      <Formik
        initialValues={{
          name: '',
          brand: '',
          description: '',
          price: '',
          category: '',
          gallery: [],
          discountInPercent: '',
          stock: '',
          minStock: '',
          sku: '',
          variants: '',
        }}
        onSubmit={(values) => handleSubmit(values)}
        // onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <Form>
          <Stack mt={4} spacing={6} direction="column">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Field
                name="name"
                id="name"
                // placeholder="Nombre del producto"
                component={CustomInput}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="brand">Marca</FormLabel>
              <Field
                name="brand"
                id="brand"
                // placeholder="Marca"
                component={CustomInput}
              />
              <ErrorMessage name="brand" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}

            <FormControl>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Field
                name="description"
                id="description"
                // placeholder="Descripción"
                size="sm"
                component={CustomTextarea}
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
                <FormLabel htmlFor="price">Precio</FormLabel>
                <Field
                  name="price"
                  id="price"
                  type="number"
                  // placeholder="Precio"
                  component={CustomInput}
                />
                <ErrorMessage name="price" component="div" className="error" />
              </FormControl>
              {/* _____________________ */}
              <FormControl>
                <FormLabel htmlFor="discountInPercent">Descuento %</FormLabel>
                <Field
                  name="discountInPercent"
                  id="discountInPercent"
                  type="number"
                  // placeholder="%"
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
                <FormLabel htmlFor="category">Categoria</FormLabel>
                <Field
                  name="category"
                  id="category"
                  as="select"
                  // placeholder="Categorias"
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
                  // placeholder="SKU"
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
                  // placeholder="Stock"
                  component={CustomInput}
                />
                <ErrorMessage name="stock" component="div" className="error" />
              </FormControl>
              {/* _____________________ */}
              <FormControl isRequired>
                <FormLabel htmlFor="minStock">Stock Minimo</FormLabel>
                <Field
                  name="minStock"
                  id="minStock"
                  type="number"
                  // placeholder="Stock Minimo"
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
            <FormControl>
              <AddVariant name="variants" />
              <ErrorMessage name="variants" component="div" className="error" />
            </FormControl>

            {/* _____________________ */}

            {/* <FormControl isRequired> */}
            <Uploader name="gallery" maxFiles={5} />
            <ErrorMessage name="gallery" component="div" className="error" />
            {/* </FormControl> */}
            {/* _____________________ */}

            <Stack mt={4} spacing={2} direction="row" align="space-between">
              <CustomButton
                type="reset"
                color="red"
                variant="outline"
                content="Cancelar"
                onClick={() => onClose && onClose()}
              />
              <CustomButton
                type="submit"
                content="Añadir Producto"
                // color={useColorModeValue('blue', '')}
              />
            </Stack>
          </Stack>
        </Form>
        {/* )} */}
      </Formik>
    </Box>
  );
};
export default AddProductForm;
