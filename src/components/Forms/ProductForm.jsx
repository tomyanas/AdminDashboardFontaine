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

/*TODO:
 */

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .max(255, "Max 255 Characters"),
  brand: Yup.string().max(255, "Max 255 Characters"),
  description: Yup.string().max(2000, "Max 2000 Characters"),
  price: Yup.number().required().min(0, "the price should be higher zero"),
  stock: Yup.number().required().min(0, "the stock should be higher zero"),
  minstock: Yup.number()
    .required()
    .min(0, "the min stock should be higher zero"),
  category: Yup.string().required().min(0, "Select a category"),
  gallery: Yup.array().min(1).max(5).required(),
  discountinpercent: Yup.number()
    .required()
    .min(0, "The discount should be higher zero")
    .max(100, "The discount should be lower one hundred"),

  sku: Yup.string(),
});

const AddProductForm = () => {
  const db = useDb();
  const categories = db.categories;

  const handleSubmit = async (values) => {
    console.log(values);
    let gallery = values.gallery.map(item=>item.path)
    let saleprice = values.price - (values.price * values.discountinpercent / 100) 
    try {
        await db.addProduct({
            ...values,
            gallery,
            image: gallery[0],
            saleprice,
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form_container staff">
      <h2>Add New Product </h2>
      <Formik
        initialValues={{
          name: "",
          brand: "",
          description: "",
          price: 0,
          category: "",
          gallery: [],
          discountinpercent: 0,
          stock: 0,
          minstock: 0,
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
                autoComplete="username"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <FormControl isRequired>
              <FormLabel htmlFor="brand">Brand</FormLabel>
              <Field
                name="brand"
                id="brand"
                placeholder="Brand"
                component={CustomInput}
                autoComplete="username"
              />
              <ErrorMessage name="brand" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}

            <FormControl isRequired>
              <FormLabel htmlFor="description" >
                Description
              </FormLabel>
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
            </FormControl >
            {/* _____________________ */}
            <FormControl isRequired>
              <FormLabel htmlFor="sku" >
                SKU
              </FormLabel>
              <Field
                name="sku"
                id="sku"
                placeholder="SKU"
                component={CustomInput}
              />
              <ErrorMessage name="sku" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}

            <FormControl isRequired>
              <FormLabel htmlFor="price" >
                Price
              </FormLabel>
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
              <ErrorMessage name="category" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}

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
              <FormLabel htmlFor="minstock">Min Stock</FormLabel>
              <Field
                name="minstock"
                id="minstock"
                type="number"
                placeholder="Min Stock"
                component={CustomInput}
              />
              <ErrorMessage name="minstock" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <Stack mt={4}>
              <FormControl isRequired >
                <Uploader name="gallery" maxFiles={5} />
                <ErrorMessage
                  name="gallery"
                  component="div"
                  className="error"
                />
              </FormControl>
            </Stack>
            {/* _____________________ */}

            <Stack mt={4} spacing={2} direction="row" align="space-between">
              <CustomButton
                type="reset"
                color="red"
                variant="outline"
                content="Cancel"
              />
              <CustomButton type="submit" content="Add Staff" />
            </Stack>
          </Stack>
        </Form>
        {/* )} */}
      </Formik>
    </div>
  );
};
export default AddProductForm;
