import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import {
  Form,

  Button,
  Spinner,
  Toast,
  ToastHeader,
  ToastBody,
} from "react-bootstrap";
import { uploadFile } from "../API/API";

const UploadFile = ({ fkValue, fk, table, setFileUploadedAt }) => {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);

  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const dropRef = useRef();

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #0e7bf1";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if (file) {
        setErrorMsg("");
        setIsUploading(true);
        uploadFile(file, fkValue, fk, table).then((res) => {
          setIsUploading(false);
          setFile(null);
          setShowToast(true);
          setPreviewSrc("");
          setFileUploadedAt(new Date().toISOString());
          setTimeout(() => {
            setShowToast(false);
          }, 2500);
        });
      } else {
        setErrorMsg("Please select a file to add.");
        setIsUploading(false);
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <React.Fragment>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <div className="upload-submit-button">
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </div>
        {isUploading && <Spinner animation="border" variant="primary" />}
      </Form>
      <Toast
        show={showToast}
        onClose={toggleToast}
        className="toast-file-upload"
      >
        <ToastHeader>
          <strong className="mr-auto">File upload</strong>
        </ToastHeader>
        <ToastBody>File has been uploaded successfully.</ToastBody>
      </Toast>
    </React.Fragment>
  );
};

export default UploadFile;
