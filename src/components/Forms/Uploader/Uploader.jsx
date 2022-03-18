import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../../assets/icons/UploadIcon";
import { useField } from "formik";
import {
  useToast,
  CloseButton,
  Box,
  Image,
  Text,
  Input,
} from "@chakra-ui/react";

export const Uploader = ({ name, maxFiles = 2 }) => {
  const [_, __, helpers] = useField(name);
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast({
          title: "Invalid Files.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (files.length + acceptedFiles.length > maxFiles) {
        toast({
          title: `Max ${maxFiles} Files.`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const mappedAccepted = acceptedFiles.map((file) => {
          return {
            file,
            errors: [],
            preview: URL.createObjectURL(file),
          };
        });
        setFiles((current) => [...current, ...mappedAccepted]);
      }
    },
    [files]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: maxFiles,
    // maxSize: 500 * 1024,
    multiple: false,
  });
  const onDelete = (fileName) => {
    let filteredFiles = files.filter((file) => file.file.name !== fileName);
    setFiles(filteredFiles);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    helpers.setValue(files.map((file) => file.file));
  }, [files]);

  return (
    <Box>
      <Box
        flex=" 1"
        display=" flex"
        flexDirection=" column"
        alignItems=" center"
        padding=" 30px"
        border=" 2px dashed #e6e6e6"
        borderRadius=" 2px"
        bg=" #ffffff"
        color=" #bdbdbd"
        outline=" none"
        transition=" border 0.24s ease-in-out"
        cursor="pointer"
        // className="uploader__container"
        {...getRootProps()}
      >
        <Input {...getInputProps()} name={name} />
        <UploadIcon />
        <Text
          as="span"
          fontFamily="'Lato', sans-serif"
          fontSize="14px"
          fontWeight="400"
          lineHeight="1.5"
          color="#161f6a"
          mt="15px"
          textAlign="center"
          // className="uploader__text"
        >
          <Text as="span" fontWeight="bold" color="#4a8cca">
            Drag/Upload
          </Text>{" "}
          your image here.
        </Text>
      </Box>
      {!!files.length && (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          mt="16px"
          // className="uploader__thumb-container"
        >
          {files.map((file, index) => (
            <ThumbUpload file={file} key={index} onDelete={onDelete} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const ThumbUpload = ({ file, onDelete }) => {
  return (
    <Box
      display="inline-flex"
      borderRadius="2px"
      border="1px solid #eaeaea"
      mb="8px"
      mr="8px"
      width="100px"
      height="100px"
      padding="4px"
    >
      <Box display="flex" minW="0" overflow="hidden" position="relative">
        <CloseButton
          size="sm"
          onClick={() => onDelete(file.file.name)}
          position="absolute"
          top={0}
          right={0}
          _hover={{ bg: "#0008", color: "#FFF" }}
        />
        <Image
          display="block"
          w="auto"
          h="100%"
          src={file.preview}
          alt={file.file.name}
        />
      </Box>
    </Box>
  );
};
