import React, {useRef, useState, useEffect} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {addHomework, addSubmission, getAllUsersInCourse} from '../API/API';
import {currentCourse, setIsAddHomeworkHidden} from '../data/Global';
import DateTimePicker from './DateTimePicker';
import TemporaryAlert from './TemporaryAlert';

export default function HomeworkForm() {
  const course = useSelector(currentCourse);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setIsAddHomeworkHidden(true));
  }, [])

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const handleDateChange = (date) => {
    try {
      date.toISOString();
      setDeadline(date);
    } catch (error) {}
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const alertRef = useRef();
  const [alertType, setAlertType] = useState('warning');
  const alertWarnHeading = 'Fields missing!';
  const alertWarnBody = 'Please fill all of the missing fields!';
  const alertSuccessHeading = 'Success!';
  const alertSuccessBody = 'homework has been created!';

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const deadlineStr = deadline.toISOString();
      console.log('submittd', deadlineStr);

      if (title !== '' && description !== '') {
        //insert homework

        const cid = course[0].cid;
        addHomework(cid, title, description, deadlineStr).then((res) => {
          setAlertType('success');
          alertRef.current.showAlert();
          setTitle('');
          setDescription('');
          setDeadline(new Date());

          // get all students in course
          getAllUsersInCourse(cid).then((r1) => {
            r1.data.forEach((p) => {
              if (p.type == 'student') {
                addSubmission(p.id, res.data);
                console.log('student id ', res.data);
              }
            });
          });
        });
      } else {
        setAlertType('warning');
        alertRef.current.showAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TemporaryAlert
        body={alertType == 'success' ? alertSuccessBody : alertWarnBody}
        heading={
          alertType == 'success' ? alertSuccessHeading : alertWarnHeading
        }
        type={alertType}
        ref={alertRef}
      />

      <h1>Add Homework</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            autoComplete="off"
            placeholder="Enter title"
            onChange={onChangeTitle}
            value={title}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            autoComplete="off"
            placeholder="Enter description"
            onChange={onChangeDescription}
            value={description}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Deadline</Form.Label>
          <DateTimePicker onChange={handleDateChange} value={deadline} />
        </Form.Group>

        <Button className="float-right" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
