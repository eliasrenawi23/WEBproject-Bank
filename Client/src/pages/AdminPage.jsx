import React, {useEffect, useState, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { BsTrash } from "react-icons/bs";
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentCourse,
  setCourseActive,
  setHomeWorkActive,
  currentUser,
  setCurrentCourseTitle,
  setHideSubmissionDetails,
  setIsAddCourseHidden,
  setIsAddHomeworkHidden,
} from '../data/Global';
import {useHistory} from 'react-router-dom';
import {
  deleteCourse,
  deleteUser,
  getAllCourses,
  getAllUsers,
  getUserCourses,
  addUser,
  getUser,
} from '../API/API';
import {Button, Form} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Modal} from 'react-bootstrap';
import TemporaryAlert from '../components/TemporaryAlert';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
const axios = require('axios');

export default function AdminPage() {
  const history = useHistory();
  const user = useSelector(currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    getAllUsers().then((res) => {
      setUsers(res.data);
    });

    getAllCourses().then((res) => {
      setCourses(res.data);
    });
  };
  useEffect(() => {
    if (user) {
      // get all courses
      // get all people

      fetchData();

      dispatch(setIsAddHomeworkHidden(false));
      dispatch(setCourseActive(true));
      dispatch(setHomeWorkActive(true));
      dispatch(setHideSubmissionDetails(true));
      dispatch(setIsAddCourseHidden(true));
    }
  }, [user]);

  const onAddCourseClicked = () => {
    dispatch(setIsAddCourseHidden(false));
    history.push('/CourseForm');
  };
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [className, setClassName] = React.useState('course');
  const [selectedUser, setSelectedUser] = useState(-1);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setClassName('course');
        break;
      case 1:
        setClassName('user');
        break;

      default:
        break;
    }
  };

  const onUserClick = (user) => {
    setSelectedUser(user);
    onDeleteClick();
  };
  const onCourseClick = (course) => {
    setSelectedCourse(course);
    onDeleteClick();
  };
  const onDeleteClick = () => {
    setShow(true);
  };
  const onDeleteConfirmed = () => {
    handleClose();
    switch (value) {
      // delete course
      case 0:
        deleteCourse(selectedCourse.id).then((res) => {
          //refresh
          fetchData();
        });
        break;
      // delete user
      case 1:
        deleteUser(selectedUser.id).then((res) => {
          //refresh
          fetchData();
        });
        break;

      default:
        break;
    }
  };
  const onHomeworkDeleteDeclined = () => {
    handleClose();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const alertRef = useRef();
  const [alertType, setAlertType] = useState('warning');

  const [alertWarnHeading, setAlertWarnHeading] = useState('Fields missing!');
  const [alertWarnBody, setAlertWarnBody] = useState(
    'Please fill all of the missing fields!'
  );

  const alertSuccessHeading = 'Success!';
  const alertSuccessBody = 'User has been registered!';
  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userType, setUserType] = useState('');
  const [userFname, setUserFname] = useState('');
  const [userLname, setUserLname] = useState('');

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      if (
        userId !== '' &&
        userPass !== '' &&
        userType !== '' &&
        userFname !== '' &&
        userLname !== ''
      ) {
        getUser(userId).then((res) => {
          if (res.data.length !== 0) {
            setAlertWarnHeading('User already exists!');
            setAlertWarnBody(
              'User already exists, please pick a different ID!'
            );
            setAlertType('warning');
            alertRef.current.showAlert();
          } else {
            //insert user
            addUser(userId, userFname, userLname, userPass, userType).then(
              (res) => {
                setAlertType('success');
                alertRef.current.showAlert();
                setUserId('');
                setUserPass('');
                setUserType('');
                setUserFname('');
                setUserLname('');
                getAllUsers().then((res) => {
                  setUsers(res.data);
                });
              }
            );
          }
        });
      } else {
        setAlertWarnHeading('Fields missing!');
        setAlertWarnBody('Please fill all of the missing fields!');
        setAlertType('warning');
        alertRef.current.showAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {className}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {className}: <br />{' '}
          {value == 1
            ? `${selectedUser.fname} ${selectedUser.lname} - ${selectedUser.id}`
            : selectedCourse.title}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {user && user.type == 'admin' && (
       <Card className="card-page">
        <Card.Header as="h5">
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Delete Courses" />
              <Tab label="Users" />
              <Tab label="Registeration" />
            </Tabs>
          </Paper>
          {/* Admin Page */}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            
          </Card.Title>
          <Card.Text>
            {value == 0 && (
              <div className="submissions-box-teacher-view mt-5">
                {value == 0 &&
                  courses &&
                  courses.length > 0 &&
                  courses.map((course, i) => {
                    return (
                      <div key={i}>
                        <CourseCell
                          course={course}
                          onClick={() => onCourseClick(course)}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
            {value == 1 && (
              <div className="submissions-box-teacher-view mt-5">
                {value == 1 &&
                  users &&
                  users.length > 0 &&
                  users.map((user, i) => {
                    return (
                      <div key={i}>
                        <UserCell user={user} onClick={() => onUserClick(user)} />
                      </div>
                    );
                  })}
              </div>
            )}
            {value == 2 && (
              <h4 className="centerTitle mt-3">Registeration</h4>
            )}
            {value == 2 && (
              <div className="submissions-box-teacher-view mt-5">
                <div className="w-100 flex-column justify-content-center align-items-center">
                  <TemporaryAlert
                    body={
                      alertType == 'success' ? alertSuccessBody : alertWarnBody
                    }
                    heading={
                      alertType == 'success'
                        ? alertSuccessHeading
                        : alertWarnHeading
                    }
                    type={alertType}
                    ref={alertRef}
                  />
                  <Form className="p-5" onSubmit={handleOnSubmit}>
                    <Form.Group controlId="formBasicId">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        onChange={(e) => setUserId(e.target.value)}
                        type="number"
                        placeholder="Enter ID"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicfname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        onChange={(e) => setUserFname(e.target.value)}
                        type="text"
                        placeholder="First Name"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasiclname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        onChange={(e) => setUserLname(e.target.value)}
                        type="text"
                        placeholder="Last Name"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={(e) => setUserPass(e.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>

                    <Form.Check
                      type="radio"
                      label="Student"
                      name="formHorizontalRadios"
                      id="student"
                      onClick={(e) => setUserType(e.target.id)}
                    />
                    <Form.Check
                      type="radio"
                      label="Teacher"
                      name="formHorizontalRadios"
                      id="teacher"
                      onClick={(e) => setUserType(e.target.id)}
                    />

                    <Button className="mt-3" variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      )}
    </>
  );
}

const CourseCell = ({course, onClick}) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onContainerClick = () => {
    onClick();
  };

  return (
    <Card  className={`submission-container ${ isHovering ? ' shadow-lg' : 'shadow '  }${'CourseSubmittedHomeWork'} m-4  `}  onMouseEnter={onMouseEnter}  onMouseLeave={onMouseLeave} >
      <Card.Header as="h5">Course ID: {course.id}</Card.Header>
      <Card.Body>
        <Card.Title>Course: {course.title}</Card.Title>
        <Card.Text>
            
        </Card.Text>
      </Card.Body>
        <Button className="remove" variant="outline-danger"  onClick={onContainerClick}> <BsTrash/></Button>
    </Card>
 
  );
};

const UserCell = ({user, onClick}) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onContainerClick = () => {
    onClick();
  };

  return (
    <Card  className={`submission-container ${ isHovering ? ' shadow-lg' : 'shadow '  }${'CourseSubmittedHomeWork'} m-4  `}  onMouseEnter={onMouseEnter}  onMouseLeave={onMouseLeave} >
      <Card.Header as="h5">User ID: {user.id}</Card.Header>
      <Card.Body>
        <Card.Title>Name: {`${user.fname} ${user.lname}`}</Card.Title>
        <Card.Text>
            Type: {user.type}
        </Card.Text>
      </Card.Body>
        <Button className="remove" variant="outline-danger"  onClick={onContainerClick}> <BsTrash/></Button>
    </Card>
    
  );
};
