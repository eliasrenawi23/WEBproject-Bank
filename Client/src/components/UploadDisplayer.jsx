import React, {useState} from 'react';
import FilesList from './FilesList';
import UploadFile from './UploadFile';

export default function UploadDisplayer({fkValue, fk, table, allowUpload, allowDelete=false, style=""}) {
  const [fileUploadedAt, setFileUploadedAt] = useState(null);
  return (
    <div className={`upload-displayed-container ${style}`}>
      <h3 className="input-edit-course-page">Files</h3>
      {allowUpload && (
        <UploadFile
          fkValue={fkValue}
          fk={fk}
          table={table}
          setFileUploadedAt={setFileUploadedAt}
        />
      )}

      <FilesList
        fkValue={fkValue}
        fk={fk}
        table={table}
        fileUploadedAt={fileUploadedAt}
        allowDelete={allowDelete}
      />
    </div>
  );
}

{/* <span className="input-edit-course-page"> Files </span>
<InputGroup className="mb-3">

  <FormControl
    placeholder={extraText}
    aria-describedby="basic-addon2"
    disabled = {isEditing ? false : true }
    type="text" onChange={onChange} value={text}
  />
  <InputGroup.Append>
    <Button variant="outline-secondary"   onClick={ isEditing ? onCheckClick: onEditClick } >
    { isEditing ? <MdCheck />: <MdEdit/> }  */}
      {/* Edit */}
    {/* </Button>
  </InputGroup.Append>
</InputGroup> */}