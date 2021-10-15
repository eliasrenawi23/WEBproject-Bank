import React, {useEffect, useRef, useState} from 'react';
import {FormControl} from 'react-bootstrap';
import {MdEdit, MdCheck} from 'react-icons/md';
import {toDateTimeString} from '../Util/TimeUtil';
import DateTimePicker from './DateTimePicker';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
export default function EditableTimeDate({
  value,
  headingClass,
  onEditSuccess = () => {},
  extraText,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [deadline, setDeadline] = useState(value);

  useEffect(() => {
    setDeadline(value);
  }, [value]);

  const onEditClick = () => {
    setIsEditing(true);
  };
  const onCheckClick = () => {
    setIsEditing(false);
    onEditSuccess(deadline);
  };
  const handleDateChange = (date) => {
    try {
      setDeadline(date.toISOString());
    } catch (error) {}
  };
  return (
    <>
    <span className="input-edit-course-page"> {extraText} </span>
    {/* <InputGroup className="mb-3 date-submition-style">
      <InputGroup.Append>
        { isEditing 
        ? 
            <DateTimePicker
              onChange={handleDateChange}
              value={new Date(deadline)}
            />
        : 
          <p className={`d-flex pb-4 ${headingClass}`}>
          {toDateTimeString(deadline)}
        </p> }

        <Button variant="outline-secondary"   onClick={ isEditing ? onCheckClick: onEditClick } >
          { isEditing 
          ?<MdCheck />
          : <MdEdit/>} 
        </Button>
      </InputGroup.Append>
    </InputGroup> */}
    </>
  );
}
