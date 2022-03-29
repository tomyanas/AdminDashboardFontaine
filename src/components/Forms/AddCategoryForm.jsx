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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/*TODO: 
* => comprobar que no haya categorias repetidas para listarlas en el select
* => construir slug si no es especificado a partir del name reemplazando 
* los espacios con guiones
* => validar con yup que el string del slug no contenga caracteres invalidos
* => verificar que el nombre de la categoria nueva no exista

*/
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Catetegory Name is Required")
    .max(100, "Max 100 Characters"),
  slug: Yup.string().required("slug").max(100, "Max 100 Characters"),
  parent_category: Yup.string().max(100, "Max 100 Characters"),
  image: Yup.array().min(1).max(5).required(),
});

export const AddCategoryForm = ({ onClose }) => {
  const {
    GenericToastSuccess,
    GenericToastError,
    onUpload,
    addCategory,
    getAllCategories,
    categories,
  } = useDb();

  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("Submit", values);
    try {
      let image = [];
      for (const item of values.image) {
        let url = await onUpload("category/", item);
        image.push(url);
      }

      let res = await addCategory({
        ...values,
        image: image[0],
      });
      res
        ? GenericToastSuccess(res)
        : GenericToastError("Error Al Crear.", "Intenta nuevamente mas tarde");
        
        onClose && onClose();
        navigate("/category");
      } catch (error) {
        console.error(error);
        GenericToastError("Error Al Crear.", "Intenta nuevamente mas tarde");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Box bg={"transparent"} p={"20px"}>
      <Heading as="h2" my={"20px"} textAlign={"center"} size="xl">
        Crear Nueva Categoría
      </Heading>

      <Formik
        initialValues={{
          name: "",
          slug: "",
          parent_category: "",
          image: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Stack mt={4} spacing={6} direction="column">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Field
                name="name"
                id="name"
                // placeholder="Category Name"
                component={CustomInput}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error"
              />
            </FormControl>
            {/* _____________________ */}
            <FormControl isRequired>
              <FormLabel htmlFor="slug">Slug</FormLabel>
              <Field
                name="slug"
                id="slug"
                // placeholder="Slug"
                component={CustomInput}
              />
              <ErrorMessage name="slug" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="parent_category">Categoría Padre</FormLabel>
              <Field
                name="parent_category"
                id="parent_category"
                type="parent_category"
                placeholder="Categoría"
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
          {/* ____________ */}
          <Stack mt={6}>
            <FormControl isRequired>
              <Uploader name="image" maxFiles={1} />
              <ErrorMessage name="image" component="div" className="error" />
            </FormControl>
          </Stack>
          {/* _____________________ */}
          <Stack mt={4} spacing={2} direction="row" align="space-between">
            <CustomButton
              type="reset"
              color="red"
              variant="outline"
              content="Cancelar"
              onClick={()=>onClose()}
            />
            <CustomButton type="submit" content="Añadir" />
          </Stack>
          {/* _____________________ */}
        </Form>
      </Formik>
    </Box>
  );
};
