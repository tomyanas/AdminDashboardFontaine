import { Uploader } from "./Uploader/Uploader";
import { Box, FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from "./CustomInputs/CustomInputs";
import { useDb } from "../../db/DbProvider";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
/*TODO:
Subir imagenes a FB storage
 */

const validationSchema = Yup.object().shape({
  options: Yup.string()
    .required("Name is Required")
    .max(255, "Max 255 Characters"),
  stock: Yup.number().required().min(0, "the stock should be higher zero"),
  gallery: Yup.array().min(1).max(5).required(),
  discountInPercent: Yup.number()
    .min(0, "The discount should be higher zero")
    .max(100, "The discount should be lower one hundred"),

  sku: Yup.string(),
});

const AddVariantForm = ({ onClose = null }) => {
  const toast = useToast();
  const db = useDb();
  const categories = db.categories;

  const handleSubmit = async (values) => {
    console.log(values);
    let algo = await db.onUpload(values.gallery[0]);
    console.log(algo);
    let gallery = values.gallery.map((item) => item.path);

    try {
      let res = await db.addProduct({
        ...values,
        gallery,
        image: gallery[0],
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
    <Box bg={"#fff"} p={"20px"}>
      <Heading as="h2" my={"20px"} textAlign={"center"} size="xl">
        Add New Variant
      </Heading>
      <Formik
        initialValues={{
          options: "",
          category: "",
          gallery: [],
          stock: "",
          sku: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <Form>
          <Stack mt={4} spacing={6} direction="column">
            <FormControl>
              <FormLabel htmlFor="options">Options</FormLabel>
              <Field
                name="options"
                id="options"
                placeholder="Options"
                component={CustomInput}
              />
              <ErrorMessage name="Options" component="div" className="error" />
            </FormControl>

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

              <FormControl /*isRequired*/>
                <Uploader name="gallery" maxFiles={5} direction="row" />
                <ErrorMessage
                  name="gallery"
                  component="div"
                  className="error"
                />
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
                <CustomButton type="submit" content="Add Variant" />
              </Stack>
            </Stack>
          </Stack>
        </Form>
        {/* )} */}
      </Formik>
    </Box>
  );
};
export default AddVariantForm;
