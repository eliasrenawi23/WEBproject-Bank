import React, {useEffect, useRef, useState} from 'react';
import {FormControl} from 'react-bootstrap';
import {MdEdit, MdCheck} from 'react-icons/md';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function EditableParagraph({
  value,
  headingClass,
  onEditSuccess = () => {},
  extraText,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();

  useEffect(() => {
    setText(value);
  }, [value]);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onEditClick = () => {
    setIsEditing(true);
  };
  const onCheckClick = () => {
    setIsEditing(false);

    onEditSuccess(text);
  };

  return (
    <>
    <span className="input-edit-course-page"> {extraText} </span>
    <InputGroup className="mb-3">
    
      <FormControl
        placeholder={extraText}
        aria-describedby="basic-addon2"
        disabled = {isEditing ? false : true }
        type="text" onChange={onChange} value={text}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary"   onClick={ isEditing ? onCheckClick: onEditClick } >
        { isEditing ? <MdCheck />: <MdEdit/> } 
          {/* Edit */}
        </Button>
      </InputGroup.Append>
    </InputGroup>
    
    </>
  );
}


// {isEditing ? (
//   <div className="d-flex pb-4 ">
//     <MdCheck
//       className="editIcon"
//       onClick={onCheckClick}
//       color="#0e7bf1"
//       size="25px"
//     />{' '}
    {/* <Form.Text type="text" onChange={onChange} value={text} /> */}
    {/* <Form.Control type="text" /> 
    <Form.Text className="text-muted" type="text" onChange={onChange} value={text}>
    </Form.Text> */}
    {/* <FormControl type="text" onChange={onChange} value={text} /> */}
  {/* </div>
) : (
  <>
  <MdEdit
      className="editIcon"
      size="25px"
      onClick={onEditClick}
      color="#0e7bf1"
    />
    <p className={`d-flex pb-4 ${headingClass}`}>
    {' '}           {extraText}

    <Form.Control type="text" />
    <Form.Text className="text-muted" type="text" onChange={onChange} value={value}>
    {value}
    </Form.Text>
    
  </p>
  </>

)} */}