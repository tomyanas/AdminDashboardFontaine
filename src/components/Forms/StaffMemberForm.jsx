import { Box, FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDb } from "../../db/DbProvider";
import { db } from "../../firebase";
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
const isValidEmail = async (value) => {
  try {
    if (!value) return false;
    else {
      const docRef = query(
        collection(db, "users"),
        where("email", "==", value)
      );
      const querySnapshot = await getDocs(docRef);
      let foundUser = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      if (foundUser[0]) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is Required")
    .max(255, "Max 255 Characters")
    .test(
      "checkEmailExist",
      "El Email de este usuario no esta registrado",
      (value) => isValidEmail(value)
    ),
  role: Yup.string().required("Select Role"),
});

const StaffMemberForm = ({ onClose }) => {
  const { roles, getAllRoles, getOneUserByEmail } = useDb();

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

  useEffect(() => {
    getAllRoles();
  }, []);
  return (
    <Box bg={"#fff"} p={"20px"}>
      <Heading as="h2" my={"20px"} textAlign={"center"} size="xl">
        Add Staff Member
      </Heading>

      <Formik
        initialValues={{
          email: "",
          role: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <Form>
          <Stack mt={4} spacing={6} direction="column">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                component={CustomInput}
                autoComplete="username"
                // onBlur={(e)=>handleOnBlur(e)}
              />
              <ErrorMessage name="email" component="div" className="error" />
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
                onClick={onClose}
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
