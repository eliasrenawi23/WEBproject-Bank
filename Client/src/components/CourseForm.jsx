import React, {useEffect, useState, useRef} from 'react';
import {Container, Form, Button, Alert} from 'react-bootstrap';
import {
  addParticipantToCourse,
  getAllUsers,
  getAllUsersInCourse,
  addCourse,
} from '../API/API';
import ColorfulSelect from './ColorfulSelect';
import TemporaryAlert from './TemporaryAlert';
import Card from 'react-bootstrap/Card';


export default function CourseForm({cid = -1}) {
  const [options, setOptions] = useState([]);
  const [initialOptions, setInitialOptions] = useState([]);
  useEffect(() => {
    getAllUsersInCourse(cid).then((r1) => {
      // get all
      getAllUsers().then((r2) => {
        let inCourse = [];
        r1.data.forEach((p) => {
          const elm = {
            value: `${p.id}`,
            color: p.type == 'student' ? '#0e7bf1' : 'red',
            label: `${p.fname} ${p.lname} (${p.id})`,
          };
          inCourse.push(elm);
        });

        let allP = [];
        r2.data.forEach((p) => {
          const elm = {
            value: `${p.id}`,
            color: p.type == 'student' ? '#0e7bf1' : 'red',
            label: `${p.fname} ${p.lname} (${p.id})`,
          };
          allP.push(elm);
        });

        // notInCourse = allP \ inCourse
        // Let inCourse be 'b'
        let b = new Set(inCourse.map((x) => x.value));
        let notInCourse = [...allP].filter((x) => !b.has(x.value));

        setInitialOptions(inCourse);
        setOptions(notInCourse);
      });
    });
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState([]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeParticipants = (values) => {
    setParticipants(values);
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (title !== '' && description !== '' && participants !== []) {
      // insert course
      addCourse(title, description).then((res) => {
        // insert courseParticipant
        const newCourseId = res.data;
        participants.forEach((p) => {
          const id = p.value;
          addParticipantToCourse(newCourseId, id);
        });
        setAlertType('success');
        alertRef.current.showAlert();
        setTitle('');
        setDescription('');
      });
    } else {
      setAlertType('warning');
      alertRef.current.showAlert();
    }
  };
  const alertRef = useRef();
  const [alertType, setAlertType] = useState('warning');
  const alertWarnHeading = 'Fields missing!';
  const alertWarnBody = 'Please fill all of the missing fields!';
  const alertSuccessHeading = 'Success!';
  const alertSuccessBody = 'course has been created!';
  return (
    <Card className="card-page">
       <Card.Header as="h5"> Add New Course </Card.Header>
       <Card.Body>
          <Card.Title>
          <TemporaryAlert
            body={alertType == 'success' ? alertSuccessBody : alertWarnBody}
            heading={
              alertType == 'success' ? alertSuccessHeading : alertWarnHeading
            }
            type={alertType}
            ref={alertRef}
          />
          </Card.Title>
          <Card.Text>
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
              <Form.Label>
                Participants (<span className="text-primary">Students</span> |{' '}
                <span className="text-danger">Teachers</span>)
              </Form.Label>
              <ColorfulSelect
                options={options}
                initialOptions={initialOptions}
                onChange={onChangeParticipants}
              />
            </Form.Group>

            <Button className="float-right" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Card.Text>
      </Card.Body>
    </Card>

  );
}
