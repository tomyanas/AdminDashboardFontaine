import { Uploader } from "./Uploader/Uploader";
import { Box, FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from "./CustomInputs/CustomInputs";


/*TODO: 
* => comprobar que no haya categorias repetidas para listarlas en el select
* => construir slug si no es especificado a partir del name reemplazando 
* los espacios con guiones
* => validar con yup que el string del slug no contenga caracteres invalidos
* => verificar que el nombre de la categoria nueva no exista

*/
const validationSchema = Yup.object().shape({
  catetegory_name: Yup.string()
    .required("Catetegory Name is Required")
    .max(100, "Max 100 Characters"),
  slug: Yup.string().max(100, "Max 100 Characters"),
  parent_category: Yup.string().max(100, "Max 100 Characters"),
  files: Yup.array().min(1).max(5).required(),
});

let categories = [
  {
    id: 1,
    name: "Tinturas",
  },
  {
    id: 2,
    name: "Decolorantes",
  },
  {
    id: 3,
    name: "Mascaras",
  },
  {
    id: 4,
    name: "Shampoos",
  },
];

export const AddCategoryForm = ({onClose}) => {
  const handleSubmit = async (values) => {
    console.log("Submit", values);
  };

  return (
    <Box bg={"#fff"} p={"20px"}>
      <Heading as="h2" my={"20px"} textAlign={"center"} size="xl">
        Add a New Category
      </Heading>

      <Formik
        initialValues={{
          catetegory_name: "",
          slug: "",
          parent_category: "",
          files: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Stack mt={4}>
            <FormControl>
              <Uploader name="files" maxFiles={1} />
              <ErrorMessage name="files" component="div" className="error" />
            </FormControl>
          </Stack>
          {/* ____________ */}
          <Stack mt={4} spacing={6} direction="column">
            <FormControl>
              <FormLabel htmlFor="catetegory_name">Category Name</FormLabel>
              <Field
                name="catetegory_name"
                id="catetegory_name"
                placeholder="Category Name"
                component={CustomInput}
              />
              <ErrorMessage
                name="catetegory_name"
                component="div"
                className="error"
              />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="slug">Slug</FormLabel>
              <Field
                name="slug"
                id="slug"
                placeholder="Slug"
                component={CustomInput}
              />
              <ErrorMessage name="slug" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="parent_category">Parent Category</FormLabel>
              <Field
                name="parent_category"
                id="parent_category"
                type="parent_category"
                placeholder="Select Parent Category"
                component={CustomSelect}
                autoComplete="username"
              >
                {categories.length &&
                  categories?.map((cat) => {
                    return (
                      <option name={cat.name} value={cat.name} key={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
              </Field>
              <ErrorMessage
                name="parent_category"
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
              onClick={onClose}
            />
            <CustomButton type="submit" content="Add Staff" />
          </Stack>
          {/* _____________________ */}
        </Form>
      </Formik>
    </Box>
  );
};
