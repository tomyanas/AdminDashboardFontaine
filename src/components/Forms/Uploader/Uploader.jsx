import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Uploader.scss";
import { UploadIcon } from "../../../assets/icons/UploadIcon";
import { useField } from "formik";
import { useToast, CloseButton } from "@chakra-ui/react";

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
    helpers.setValue(files.map(file=> file.file));
  }, [files]);

  return (
    <section className="container uploader">
      <div className="uploader__container" {...getRootProps()}>
        <input {...getInputProps()} name={name} />
        <UploadIcon />
        <span className="uploader__text">
          <span>Drag/Upload</span> your image here.
        </span>
      </div>
      {!!files.length && (
        <aside className="uploader__thumb-container">
          {files.map((file, index) => (
            <ThumbUpload file={file} key={index} onDelete={onDelete} />
          ))}
        </aside>
      )}
    </section>
  );
};

const ThumbUpload = ({ file, onDelete }) => {
  return (
    <div className="uploader__thumb">
      <div className="uploader__thumb-inner">
        <CloseButton
          size="sm"
          onClick={() => onDelete(file.file.name)}
          position="absolute"
          top={0}
          right={0}
          _hover={{ bg: "#0008", color: "#FFF" }}
        />
        <img
          className="uploader__thumb-img"
          src={file.preview}
          alt={file.file.name}
        />
      </div>
    </div>
  );
};
