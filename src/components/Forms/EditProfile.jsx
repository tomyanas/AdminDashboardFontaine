import React, { useEffect, useState } from 'react';
import {
    Box,
    Stack,
    Center,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Heading,
    ButtonGroup,
} from '@chakra-ui/react'
import { useDb } from '../../db/DbProvider'
import { useAuth } from "../../auth/AuthProvider";
import { InLineLoader } from '../InlineLoader/InlineLoader';
import {
    InputControl,
    PercentComplete,
    ResetButton,
    SubmitButton,
} from 'formik-chakra-ui';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required("Name is Required"),
    lastName: Yup.string()
        .required("Name is Required"),
    phone: Yup.string()
        .required("Phone is Required"),
    address: Yup.string()
        .required("Address is Required"),
    city: Yup.string()
        .required("City is Required"),
    state: Yup.string()
        .required("State is Required"),
    zip: Yup.string()
        .required("Zip is Required"),
    country: Yup.string()
        .required("Country is Required"),
});

export const EditProfile = ({ isOpen, onClose }) => {
    const { user, refreshUser } = useAuth();
    const { updateUser, GenericToastSuccess, GenericToastError } = useDb();
    const [userDetail, setUserDetail] = useState(user);

    useEffect(() => {
        refreshUser()
        setUserDetail(user)
    }, [])

    const handleOnSubmit = async (event, values) => {
        event.preventDefault();
        try {
          
            values.name = values.firstName + ' ' + values.lastName
            await updateUser(userDetail.uid, values);
            await refreshUser()
            GenericToastSuccess("Tu perfil ha sido actualizado");
            onClose()
        } catch (error) {
            GenericToastError("Lo sentimos, algo salió mal");
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

                                    firstName: userDetail.firstName ? userDetail.firstName : "",
                                    lastName: userDetail.lastName ? userDetail.lastName : "",
                                    phone: userDetail.phone ? userDetail.phone : "",
                                    address: userDetail.address ? userDetail.address : "",
                                    city: userDetail.city ? userDetail.city : "",
                                    state: userDetail.state ? userDetail.state : "",
                                    zip: userDetail.zip ? userDetail.zip : "",
                                    country: userDetail.country ? userDetail.country : "US",

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
                                            <InputControl name="phone" label="phone" />
                                            <InputControl name="address" label="address" />
                                            <InputControl name="city" label="city" />
                                            <InputControl name="state" label="state" />
                                            <InputControl name="zip" label="zip" />
                                            <InputControl name="country" label="country" />

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
