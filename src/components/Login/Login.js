import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye } from "../../assets/icons/Eye";
import { EyeOff } from "../../assets/icons/EyeOff";
import { useAuth } from "../../auth/AuthProvider";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useToast } from '@chakra-ui/react'

const loginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
  });
};

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";
  const toast = useToast()

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await auth.login(values);
      navigate(from, { replace: true });
    } catch (e) {
      toast({
        // title: 'Login Error.',
        description: e.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
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
        <FormControl id="email" isRequired marginBottom={6}>
          <FormLabel>Email</FormLabel>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Ex: example@fontaine.com"
            component={MyInput}
          />
        </FormControl>

        <FormControl id="password" isRequired marginBottom={6}>
          <FormLabel>Password</FormLabel>
          <Field
            id="password"
            type="password"
            name="password"
            component={MyInput}
            placeholder="********"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          borderRadius={3}
          width="100%"
          style={{ marginTop: 15 }}
          _focus={{ outline: "none" }}
        >
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;

const MyInput = ({ field, form: { touched, errors }, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {props?.type === "password" ? (
        <>
          <InputGroup size="md">
            <Input
              {...field}
              {...props}
              bg="#EEEEEE"
              borderRadius={0}
              border="none"
              _placeholder={{ color: "#777", fontWeight: 600 }}
              _focus={{ border: "2px solid #51a6f5" }}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
              <Button
                p={2}
                fontSize={"10px"}
                color="#aaa"
                bg="transparent"
                onClick={() => setShow(!show)}
                _focus={{ outline: "none" }}
                _hover={{ bg: "transparent", color: "#777" }}
                _active={{ bg: "transparent", color: "#777" }}
              >
                {show ? <EyeOff /> : <Eye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </>
      ) : (
        <>
          <Input
            {...field}
            {...props}
            bg="#EEEEEE"
            borderRadius={0}
            border="none"
            _placeholder={{ color: "#777", fontWeight: 600 }}
            _focus={{ border: "2px solid #51a6f5" }}
          />
          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </>
      )}
    </>
  );
};
