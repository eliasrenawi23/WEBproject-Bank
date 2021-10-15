import React, {useEffect, useRef, useState} from 'react';
import Card from 'react-bootstrap/Card';

import {
  setHomeWorksActive,
  currentHomeworkTeacher,
  setHomeWorkActive,
  currentUser,
  setCurrentSubmission,
  setHideSubmissionDetails,
  setCurrentSubmissionStudentId,
  setCurrentHomeworkTeacher,
  setCurrentHomeworkTitle,
} from '../data/Global';
import {useSelector, useDispatch} from 'react-redux';

import {
  getStudentsHomeWorks,
  getStudentDetails,
  updateHomework,
  deleteHomework,
} from '../API/API';
import Container from 'react-bootstrap/Container';
import {useHistory} from 'react-router-dom';
import UploadDisplayer from '../components/UploadDisplayer';
import {toDateTimeString} from '../Util/TimeUtil';
import SubmissionCell from '../components/SubmissionCell';
import EditableParagraph from '../components/EditableParagraph';
import EditableDateTime from '../components/EditableDateTime';
import {MdDeleteForever} from 'react-icons/md';
import CustomerDialog from '../components/CustomerDialog';
import {Button, Modal} from 'react-bootstrap';

export default function HomeworkTeacherView() {
  const Homework = useSelector(currentHomeworkTeacher);
  const history = useHistory();
  const user = useSelector(currentUser);

  const dispatch = useDispatch();
  const [StudentsHomeWorks, setStudentHomeWorks] = useState([]);
  const [deadline, setDeadline] = useState();

  useEffect(() => {
    getStudentsHomeWorks(Homework.id).then((res) => {
      let x = res.data;
      setStudentHomeWorks(x);
    });
  }, []);

  useEffect(() => {
    dispatch(setHideSubmissionDetails(true));
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));
  }, []);

  const onSubmissionClick = (stuSub) => {
    getStudentDetails(stuSub.studentid).then((res) => {
      // dispatch(setCurrStuTeachViewActive(res.data));
      const data = {
        homeworkTitle: Homework.title,
        student: res.data[0],
        submission: stuSub,
        description: Homework.description,
      };
      dispatch(setCurrentSubmission(data));
      dispatch(setHideSubmissionDetails(false));
      dispatch(setCurrentSubmissionStudentId(stuSub.studentid));
      history.push('/SubmissionTeacherView');
    });
  };

  const onEditTitleSuccess = (value) => {
    // update in server
    console.log('updating title', value);
    updateHomeworkLocal(value, Homework.description, Homework.deadline);
    updateHomework(Homework.id, value, Homework.description, Homework.deadline);
  };

  const onEditDescriptionSuccess = (value) => {
    // update in server
    updateHomeworkLocal(Homework.title, value, Homework.deadline);
    updateHomework(Homework.id, Homework.title, value, Homework.deadline);
  };

  const onEditDeadlineSuccess = (value) => {
    setDeadline(toDateTimeString(value));
    console.log('new deadline:', value);
    const deadlineStr = value;
    // update in server
    updateHomeworkLocal(Homework.title, Homework.description, deadlineStr);
    updateHomework(
      Homework.id,
      Homework.title,
      Homework.description,
      deadlineStr
    );
  };

  const updateHomeworkLocal = (title, description, deadline) => {
    let homeworkCopy = JSON.parse(JSON.stringify(Homework));
    homeworkCopy.title = title;
    homeworkCopy.description = description;
    homeworkCopy.deadline = deadline;

    dispatch(setCurrentHomeworkTeacher(homeworkCopy));
    dispatch(setCurrentHomeworkTitle(homeworkCopy.title));
  };
  const onDeleteClick = () => {
    setShow(true);
  };
  const onHomeworkDeleteConfirmed = () => {
    deleteHomework(Homework.id).then((res) => {
      history.goBack();
    });
  };
  const onHomeworkDeleteDeclined = () => {
    handleClose();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
    
      <h1 className="centerTitle">Homework Page</h1>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Homework</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this homework?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHomeworkDeleteDeclined}>
            Close
          </Button>
          <Button variant="danger" onClick={onHomeworkDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Card className="Login card-page">

        <Card.Header as="h5">  </Card.Header>
        <Card.Body>
          <Card>
            <Card.Header as="h5">Students' Submissions</Card.Header>
            <Card.Body>
              <Card.Text>
                <MdDeleteForever
                  className="editIcon float-right"
                  onClick={onDeleteClick}
                  color="red"
                  size="2em"
                />
                <span
                  className="float-right"
                  style={{fontSize: '1.2em', color: 'red', cursor: 'pointer'}}
                  onClick={onDeleteClick}
                >
                  Delete
                </span>
                <EditableParagraph
                  headingClass="h3 p-3 mb-3"
                  value={Homework.title}
                  onEditSuccess={onEditTitleSuccess}
                  extraText={"Title: "}

                />
                <div>
              
                  <EditableDateTime
                    headingClass="h4 p-3 mb-3"
                    value={Homework.deadline}
                    onEditSuccess={onEditDeadlineSuccess}
                    extraText={"Deadline: "}
                  />
                </div>

                <EditableParagraph
                  headingClass="h4 p-3 mb-3"
                  value={Homework.description}
                  onEditSuccess={onEditDescriptionSuccess}
                  extraText={"Description: "}

                />
                <UploadDisplayer
                  fkValue={Homework.id}
                  fk="homework_id"
                  table="homework_file"
                  allowUpload={user.type === 'teacher'}
                  allowDelete={user.type === 'teacher'}
                />
             </Card.Text>
            </Card.Body>
          </Card>
          <Card.Title>
          
          </Card.Title>
          <Card.Text>
         
            {StudentsHomeWorks.length === 0 && <h4>No submissions yet!</h4>}
            {StudentsHomeWorks.map((submission, i) => {
              return (
                <SubmissionCell
                  key={i}
                  className="item"
                  submission={submission}
                  onClick={() => onSubmissionClick(submission)}
                />
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
   
    </>
  );
}
