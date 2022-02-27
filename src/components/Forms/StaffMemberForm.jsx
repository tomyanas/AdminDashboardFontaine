import { Box, FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useAuth } from "../../auth/AuthProvider";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from "./CustomInputs/CustomInputs";


/*TODO:
 * => comprobar que el email ingresado exista en la db como customer
 * => Listar los roles existentes y mostrar solo los permitidos segun su nivel
 */

let roles = [
  {
    id: 1,
    name: "SuperAdmin",
  },
  {
    id: 2,
    name: "Admin",
  },
  {
    id: 3,
    name: "Shop Manager",
  },
  {
    id: 4,
    name: "Customer",
  },
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid Email")
    .max(255, "Max 255 Characters"),
  mobile_phone: Yup.number().min(8, "Min 8 Characters"),
  role: Yup.string().required("Select Role"),
});

const StaffMemberForm = () => {
  // const auth = useAuth();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      // metodo en auth add Staff member
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg={"#fff"} p={"20px"}>
      <Heading as="h2" my={"20px"} textAlign={"center"} size="xl">
        Add Staff Member
      </Heading>

      <Formik
        initialValues={{
          email: "",
          role: "",
          mobile_phone: "",
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
                {roles.length &&
                  roles.map((role) => {
                    return <option key={role.id}>{role.name}</option>;
                  })}
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
    </Box>
  );
};
export default StaffMemberForm;
