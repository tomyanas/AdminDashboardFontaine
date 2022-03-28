import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Heading,
    useDisclosure,
} from '@chakra-ui/react'
import { useDb } from '../../db/DbProvider'





export const EditProfile = ({ isOpen, onClose }) => {

    return (
        <Drawer onClose={onClose} isOpen={isOpen} size={"md"} >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader
                as={Heading}
                size="xl"
                textAlign="center"
                >
                    Edit Profile
                </DrawerHeader>
                <DrawerBody>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default EditProfile
