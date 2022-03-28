import React, { useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Center,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Heading,
    useDisclosure,
    ButtonGroup,
} from '@chakra-ui/react'
import { useDb } from '../../db/DbProvider'
import { useAuth } from "../../auth/AuthProvider";
import { InLineLoader } from '../InlineLoader/InlineLoader';
import {
    InputControl,
    NumberInputControl,
    PercentComplete,
    ResetButton,
    SelectControl,
    SubmitButton,
    TextareaControl
} from 'formik-chakra-ui';
import * as Yup from "yup";
import { Formik } from "formik";

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is Required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Name is Required"),
    firstName: Yup.string()
        .required("Name is Required"),
    lastName: Yup.string()
        .required("Name is Required"),
    photoURL: Yup.string(),
    role: Yup.string()
        .required("Role is Required"),

});



export const EditProfile = ({ isOpen, onClose }) => {
    const { user, refreshUser } = useAuth();
    const { updateUser, GenericToastSuccess, GenericToastError } = useDb();
    const [userDetail, setUserDetail] = useState(user);
    console.log(user)


    useEffect(() => {
      refreshUser()
      setUserDetail(user)
      console.log( user, 'soyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
     }, [  ])
    

    const handleOnSubmit = async (event, values) => {
        event.preventDefault();
        try {
            await updateUser(userDetail.uid, values);
            await refreshUser()

            GenericToastSuccess("Profile Updated Successfully");

            onClose()
        } catch (error) {
            GenericToastError("Error Updating Profile");
        }

    }




    return (
        <Drawer onClose={onClose} isOpen={isOpen} size={"md"} >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                    as={Heading}
                    size="xl"
                    textAlign="center"
                >
                    Edit Profile
                </DrawerHeader>
                <DrawerBody>
                    <Box>
                        {userDetail ? (
                            <Formik
                                initialValues={{
                                    name: userDetail.name,
                                    firstName: userDetail.firstName,
                                    lastName: userDetail.lastName,
                                    email: userDetail.email,
                                    role: userDetail.role,
                                }}
                                onSubmit={handleOnSubmit}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors }) => (
                                    <Box
                                        p={5}

                                        rounded="lg"

                                        maxWidth={800}
                                        spacing={10}
                                        m="10% auto"
                                        as="form"
                                        onSubmit={(event) => handleOnSubmit(event, values)}
                                    >
                                        <Stack
                                            spacing={8}
                                        >

                                            <InputControl name="firstName" label="firstName" />
                                            <InputControl name="lastName" label="lastName" />


                                            <Center>
                                                <PercentComplete />
                                                <ButtonGroup>
                                                    <SubmitButton disabled={Object.keys(errors).length}>Submit</SubmitButton>
                                                    <ResetButton>Reset</ResetButton>
                                                </ButtonGroup>
                                            </Center>
                                        </Stack>
                                    </Box>
                                )}
                            </Formik>
                        ) : (
                            <InLineLoader />
                        )
                        }
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default EditProfile
