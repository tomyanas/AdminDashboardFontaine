import { Uploader } from "./Uploader/Uploader";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from "./CustomInputs/CustomInputs";
import "./Forms.scss";
import { useDb } from "../../db/DbProvider";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
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

const AddProductForm = ({ onClose = null }) => {
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
    console.log(salePrice, values.price,values.discountInPercent )
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
      <h2>Add New Product </h2>
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
export default AddProductForm;
