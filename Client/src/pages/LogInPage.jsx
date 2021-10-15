import React, {useState, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useDispatch} from 'react-redux';
import {
  setCurrentUser,
  setCourseActive,
  setHomeWorkActive,
  setHomeWorksActive,
  setIsAddCourseHidden,
  setHideSubmissionDetails,
  setIsAddHomeworkHidden,
} from '../data/Global';
import {useHistory} from 'react-router-dom';
import {setCoursesActive} from '../data/Global';
import {logIn} from '../API/API';
import TemporaryAlert from '../components/TemporaryAlert';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsAddHomeworkHidden(false));

    dispatch(setCoursesActive(true));
    dispatch(setCourseActive(true));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
    dispatch(setIsAddCourseHidden(true));
    dispatch(setHideSubmissionDetails(true));
  }, []);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const alertRef = useRef();
  function validateForm() {
    return id.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    logIn(id, password).then((res) => {
      console.log("res: ",res)
      if (res && res.data && res.data.length !== 0) {
  
        if (res.data[0].fname === 'Admin' && res.data[0].lname === 'Admin') {
          history.push('/AdminPage');
          dispatch(setCurrentUser(res.data[0]));
        } else {
          history.push('/Courses');
          dispatch(setCurrentUser(res.data[0]));
          dispatch(setCoursesActive(false));
        }
      } else {
        alertRef.current.showAlert();
      }
    });
  }

  const alertHeading = 'Log in failed';
  const alertBody = 'Password or ID are not correct! try again.';

  return (
    <Card className="Login card-page">
       <TemporaryAlert
        body={alertBody}
        heading={alertHeading}
        type="warning"
        ref={alertRef}
      />
      <Card.Header as="h5">
        LogIn
      </Card.Header>
      <Card.Body>
        <Card.Title> </Card.Title>
        <Card.Text> 
          <Form onSubmit={handleSubmit}> 
            <Form.Group as={Row} size="xlg" controlId="email">
              <Form.Label column sm="3">
                ID
              </Form.Label>
              <Col sm="9">
                <Form.Control 
                              autoFocus  
                              type="number" 
                              value={id}  
                              onChange={(e) => setId(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} size="lg" controlId="password">
              <Form.Label column lg="3"> Password </Form.Label>
              <Col lg="9">
                <Form.Control 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Button block size="lg" variant="primary" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  
  );
}
