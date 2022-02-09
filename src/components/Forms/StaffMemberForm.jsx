import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
  CustomSelect,
} from "./CustomInputs/CustomInputs";
import "./Forms.scss";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is Required")
    .max(100, "Max 100 Characters"),
  last_name: Yup.string()
    .required("Last Name is Required")
    .max(100, "Max 100 Characters"),
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid Email")
    .max(255, "Max 255 Characters"),
  mobile_phone: Yup.number().min(8, "Min 8 Characters"),
  role: Yup.string().required("Select Role"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Min 8 Characters")
    .max(32, "Max 32 Characters"),
});

const StaffMemberForm = () => {
  function handleSubmit(values) {
    console.log(values);
  }

  return (
    <div className="form_container staff">
      <h2>Add Staff Member </h2>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          role: "",
          mobile_phone: "",
          password: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <Form >
          <Stack mt={4} spacing={6} direction="column">
            <FormControl>
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <Field
                name="first_name"
                id="first_name"
                placeholder="First Name"
                component={CustomInput}
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error"
              />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <Field
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                component={CustomInput}
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="error"
              />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="mobile_phone">Mobile Phone</FormLabel>
              <Field
                name="mobile_phone"
                id="mobile_phone"
                type="tel"
                placeholder="Mobile Phone"
                component={CustomInput}
              />
              <ErrorMessage
                name="mobile_phone"
                component="div"
                className="error"
              />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                component={CustomInput}
                autoComplete="username"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                component={CustomInputPassword}
              />
              <ErrorMessage name="password" component="div" className="error" />
            </FormControl>
            {/* _____________________ */}
            <FormControl>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Field
                name="role"
                id="role"
                as="select"
                placeholder="Select Role"
                component={CustomSelect}
              >
                <option>Shop Manager</option>
                <option>Delivery</option>
                <option>Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="error" />
            </FormControl>
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
export default StaffMemberForm;
