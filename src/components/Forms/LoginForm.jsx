import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
} from "./CustomInputs/CustomInputs";

const loginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
  });
};

const LoginForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";
  const toast = useToast();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await auth.login(values);
      navigate(from, { replace: true });
    } catch (e) {
      toast({
        // title: 'Login Error.',
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(e.message);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormControl isRequired marginBottom={6}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Ex: example@fontaine.com"
            component={CustomInput}
            autoComplete="username"
          />
        </FormControl>

        <FormControl isRequired marginBottom={6}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Field
            id="password"
            type="password"
            name="password"
            component={CustomInputPassword}
            placeholder="********"
            autoComplete="current-password"
          />
        </FormControl>

        <CustomButton type="submit" content="Login" />
      </Form>
    </Formik>
  );
};

export default LoginForm;
