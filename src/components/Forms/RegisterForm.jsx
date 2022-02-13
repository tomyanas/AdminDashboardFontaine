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

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is Required")
    .max(100, "Max 100 Characters"),
  lastName: Yup.string()
    .required("Last Name is Required")
    .max(100, "Max 100 Characters"),
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid Email")
    .max(255, "Max 255 Characters"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Min 8 Characters")
    .max(32, "Max 32 Characters"),
});

const RegisterForm = () => {
  const auth = useAuth();

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      auth.signup(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={validationSchema}
    >
      <Form>
          <FormControl isRequired marginBottom={6}>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <Field
              id="firstName"
              name="firstName"
              placeholder="Example"
              component={CustomInput}
            />
            <ErrorMessage name="firstName" component="div" className="error" />
          </FormControl>
          {/* _____________________ */}
          <FormControl isRequired marginBottom={6}>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <Field
              name="lastName"
              id="lastName"
              placeholder="Fontaine"
              component={CustomInput}
            />
            <ErrorMessage name="lastName" component="div" className="error" />
          </FormControl>
          {/* _____________________ */}
          <FormControl isRequired marginBottom={6}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="Ex: example@fontaine.com"
              component={CustomInput}
              autoComplete="username"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </FormControl>
          {/* _____________________ */}
          <FormControl isRequired marginBottom={6}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              component={CustomInputPassword}
            />
            <ErrorMessage name="password" component="div" className="error" />
          </FormControl>
          {/* _____________________ */}

          <Stack mt={4} spacing={2} direction="row" align="space-between">
            <CustomButton
              type="reset"
              color="red"
              variant="outline"
              content="Cancel"
            />
            <CustomButton type="submit" content="Register" />
          </Stack>
      </Form>
    </Formik>
  );
};
export default RegisterForm;
