import Uploader from "./Uploader/Uploader";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../auth/AuthProvider";
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
} from "./CustomInputs/CustomInputs";
import "./Forms.scss";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  catetegory_name: Yup.string()
    .required("Catetegory Name is Required")
    .max(100, "Max 100 Characters"),
  slug: Yup.string().max(100, "Max 100 Characters"),
  parent_category: Yup.string().max(100, "Max 100 Characters"),
});

export const AddCategoryForm = () => {
  const auth = useAuth();
  const [upload, setUpload] = useState([]);

  const handleUploader = (files) => {
    console.log(files);
    setUpload(files[0].path);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="form_container ">
      <h2>Register </h2>

      <Formik
        initialValues={{
          catetegory_name: "",
          slug: "",
          parent_category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Stack mt={4}>
            <Uploader onChange={handleUploader} imageURL="Hola" />
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
              <FormLabel htmlFor="parent_category">Parent</FormLabel>
              <Field
                name="parent_category"
                id="parent_category"
                type="parent_category"
                placeholder="Parent"
                component={CustomInput}
                autoComplete="username"
              />
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
            />
            <CustomButton type="submit" content="Add Staff" />
          </Stack>
          {/* _____________________ */}
        </Form>
      </Formik>
    </div>
  );
};
