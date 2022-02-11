import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../auth/AuthProvider";
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
  CustomSelect,
} from "./CustomInputs/CustomInputs";
import "./Forms.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid Email")
    .max(255, "Max 255 Characters"),
  mobile_phone: Yup.number().min(8, "Min 8 Characters"),
  role: Yup.string().required("Select Role"),
});

const StaffMemberForm = () => {
  const auth = useAuth();

  const handleSubmit = async (values) => {
    console.log(values.email, values.password);
    try {
      let userCredential = await auth.signup(values);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Form>
          <Stack mt={4} spacing={6} direction="column">
            <FormControl isRequired>
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

            <FormControl isRequired>
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
