import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {getFiles, downloadFile, deleteFile} from '../API/API';
import {toDateTimeString} from '../Util/TimeUtil';

const FilesList = ({
  fkValue,
  fk,
  table,
  fileUploadedAt,
  allowDelete = false,
}) => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const getFilesList = async () => {
    try {
      getFiles(fkValue, fk, table).then((res) => {
        setErrorMsg('');
        if (res) setFilesList(res.data);
      });
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  useEffect(() => {
    getFilesList();
  }, [fileUploadedAt]);

  const downloadFileCapsule = (id, table, path, mimetype) => {
    downloadFile(id, table, path, mimetype);
  };

  const [show, setShow] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteFilePrompt = (id, table) => {
    // ask of sure about deleting
    setFileToDelete({
      id,
      table,
    });
    handleShow();
  };

  const onDeleteFileConfirmed = () => {
    console.log('delete', fileToDelete);
    deleteFile(fileToDelete.id, fileToDelete.table);
    handleClose();
    setFilesList(filesList.filter((x) => x.id !== fileToDelete.id));
    setFileToDelete(null);
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting file</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this file?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onDeleteFileConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="files-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Uploaded At</th>
            <th>Download File</th>
            {allowDelete && <th>Delete File</th>}
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(({created_at, id, mimetype, path, title}) => (
              <tr key={id}>
                <td className="file-title">{title}</td>
                <td className="file-description">
                  {toDateTimeString(created_at)}
                </td>
                <td>
                  <a
                    className="file-download"
                    onClick={() =>
                      downloadFileCapsule(id, table, path, mimetype)
                    }
                  >
                    Download
                  </a>
                </td>
                {allowDelete && (
                  <td>
                    <a
                      className="file-download"
                      onClick={() => deleteFilePrompt(id, table)}
                    >
                      Delete
                    </a>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={allowDelete ? 4 : 3} style={{fontWeight: '400'}}>
                No files found. Please add files.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
