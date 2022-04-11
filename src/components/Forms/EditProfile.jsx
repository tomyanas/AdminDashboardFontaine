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
    useColorModeValue,
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
    phoneNumber: Yup.string()
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
            values.address = `${values.address}, ${values.city}, ${values.state}, ${values.zip}, ${values.country}`
            values.name = values.firstName + ' ' + values.lastName
            await updateUser(userDetail.uid, values);
            await refreshUser()
            GenericToastSuccess("Tu perfil ha sido actualizado");
            onClose()
        } catch (error) {
            GenericToastError("Lo sentimos, algo salió mal");
        }
    }
    let bgColor = useColorModeValue('#EEEEEE', '#2d3748');
    let bgColorLabel = useColorModeValue('white','#2d3748');
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
                                    phoneNumber: userDetail.phoneNumber ? userDetail.phoneNumber : "",
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

                                            <InputControl name="firstName" label="firstName"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="lastName" label="lastName"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="phoneNumber" label="phone"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="address" label="address"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="city" label="city"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="state" label="state"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="zip" label="zip"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />
                                            <InputControl name="country" label="country"
                                                labelProps={
                                                    {
                                                        backgroundColor: bgColorLabel,
                                                        width: "100%",
                                                        margin: "0 auto",
                                                        paddingBottom: "10px",
                                                    }
                                                }

                                                bg={bgColor}
                                            />

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
