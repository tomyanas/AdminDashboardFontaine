import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Uploader.scss';
import { UploadIcon } from '../../../assets/icons/UploadIcon';


const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

function Uploader({ onChange, imageURL }) {
  const [files, setFiles] = useState(
    imageURL ? [{ name: 'demo', preview: imageURL }] : []
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: useCallback(
      (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        onChange(acceptedFiles);
      },
      [onChange]
    ),
  });

  const thumbs = files.map((file) => (
    <div className='uploader__thumb' key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div >
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container uploader">
      <div className='uploader__container' {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon />
        <span className='uploader__text'>
          <span>Drag/Upload</span> your image here.
        </span >
      </div >
      {thumbs && <aside className='uploader__thumb-container'>{thumbs}</aside >}
    </section>
  );
}

export default Uploader;
