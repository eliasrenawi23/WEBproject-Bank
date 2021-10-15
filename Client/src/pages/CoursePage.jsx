import React, {useEffect, useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CourseStudentHomeWorkCell from '../components/CourseStudentHomeWorkCell';
import CourseTeacherHomeWorkCell from '../components/CourseTeacherHomeWorkCell';
import {useSelector, useDispatch} from 'react-redux';
import {
  currentUser,
  setCourseActive,
  setHomeWorkActive,
  currentCourse,
  setCurrentHomeworkStudent,
  setCurrentHomeworkTeacher,
  setHomeWorksActive,
  setCurrentHomeworkTitle,
  setHideSubmissionDetails,
  setIsAddCourseHidden,
  setCurrentCourseTitle,
  setCurrentCourse,
  setCurrentSubmission,
  setCurrentSubmissionStudentId,
  setIsAddHomeworkHidden,
} from '../data/Global';

import {useHistory} from 'react-router-dom';
import {
  getStudentHomeWorks,
  getCourseHomeWorks,
  updateCourse,
} from '../API/API';
import {getStudentDetails} from '../API/API';
import UploadDisplayer from '../components/UploadDisplayer';
import {MdEdit, MdCheck} from 'react-icons/md';
import {Button, FormControl} from 'react-bootstrap';
import EditableParagraph from '../components/EditableParagraph';
import {toDateTimeString} from '../Util/TimeUtil';

export default function Course() {
  const course = useSelector(currentCourse);
  const [CourseStudentHomeWorks, setCoursesStudentHomeWorks] = useState([]);
  const [CourseTeacherHomeWorks, setCoursesTeacherHomeWorks] = useState([]);
  const user = useSelector(currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  useEffect(() => {
    console.log("Dsfdsf")
    setCourseName(course[0].title);
    setCourseDescription(course[0].description);

    getCourseHomeWorks(course[0].cid).then((res) => {
      let sortedRes = res.data;

      sortedRes.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      setCoursesTeacherHomeWorks(sortedRes);
    });

    getStudentHomeWorks(user.id, course[0].cid).then((res) => {
      let sortedRes = res.data;
      sortedRes.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });

      setCoursesStudentHomeWorks(sortedRes);
      console.log('submissions', sortedRes);
    });
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(false));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
    dispatch(setHideSubmissionDetails(true));
    dispatch(setIsAddCourseHidden(true));
    dispatch(setIsAddHomeworkHidden(false));

  }, []);

  const onClickStudent = (stuSub) => {
    getStudentDetails(stuSub.studentid).then((res) => {
      // dispatch(setCurrStuTeachViewActive(res.data));
      const data = {
        homeworkTitle: stuSub.title,
        student: res.data[0],
        submission: stuSub,
        description: stuSub.description,

      };
      dispatch(setCurrentSubmission(data));
      dispatch(setHideSubmissionDetails(false));
      dispatch(setCurrentSubmissionStudentId(stuSub.title));
      dispatch(setCourseActive(false));

      history.push('/SubmissionTeacherView');
    });
  };

  const onClickTeacher = (HomeWork) => {
    dispatch(setCurrentHomeworkTeacher(HomeWork));
    dispatch(setCourseActive(false));
    dispatch(setCurrentHomeworkTitle(HomeWork.title));
    history.push('/HomeworksTeacherView');
  };

  const onEditDescriptionSuccess = (value) => {
    setCourseDescription(value);
    // update in server
    updateCourse(course[0].cid, courseName, value);
    updateCourseLocal(courseName, value);
  };
  const onEditTitleSuccess = (value) => {
    setCourseName(value);
    // update in server
    updateCourse(course[0].cid, value, courseDescription);
    updateCourseLocal(value, courseDescription);
  };

  const updateCourseLocal = (title, description) => {
    let courseCopy = JSON.parse(JSON.stringify(course));
    courseCopy.forEach((c) => {
      c.title = title;
      c.description = description;
    });
    dispatch(setCurrentCourse(courseCopy));
    dispatch(setCurrentCourseTitle(courseCopy[0].title));
  };

  const onClickAddHomework = () => {
    history.push('/HomeworkForm');
  };

  return (
    <Card className="Login card-page">
      <Card.Header as="h5"> Course Page </Card.Header>
      <Card.Body>
        <Card.Title>
          <h1 className="centerTitle">Course Page</h1>
         
          {user && user.type == 'teacher' ? (
            <EditableParagraph
              headingClass="h3 text-center"
              value={courseName}
              onEditSuccess={onEditTitleSuccess}
              extraText={"Course Name: "}

            />
          ) : (
            <h5 className=" p-4">Course Name: {courseName}</h5>
          )}
          
          {user && user.type == 'teacher' ? (
            <EditableParagraph
              headingClass="h5"
              value={courseDescription}
              onEditSuccess={onEditDescriptionSuccess}
              extraText={"Description: "}

            />
          ) : (
            <h5 className=" p-4">Description: {courseDescription}</h5>
          )}

          {course && course.length > 0 && (
            <UploadDisplayer
              fkValue={course[0].cid}
              fk="course_id"
              table="course_file"
              allowUpload={user.type == 'teacher'}
              allowDelete={user.type == 'teacher'}
            />
          )}
        </Card.Title>
        <Card.Text>
          <h3 className="text-center">Homeworks</h3>
          {user.type == 'teacher' && (
            <div className="ml-5 ml-5 mt-3 mb-3">
              <Button
                variant="primary"
                type="submit"
                onClick={onClickAddHomework}
              >
                Add Homework
              </Button>
            </div>
          )}

          {user.type == 'teacher' && CourseTeacherHomeWorks.length == 0 && (
            <h5>No homeworks yet!, add homework</h5>
          )}
          {user.type == 'teacher' &&
            CourseTeacherHomeWorks.map((HomeWork, i) => {
              return (
                <Row key={i}>
                  <CourseTeacherHomeWorkCell
                    id={HomeWork.id}
                    Title={HomeWork.title}
                    DeadLine={toDateTimeString(HomeWork.deadline)}
                    onClick={() => onClickTeacher(HomeWork)}
                  />
                </Row>
              );
            })}

          {user.type == 'student' && CourseStudentHomeWorks.length == 0 && (
            <h5>No homeworks yet!</h5>
          )}
          {user.type == 'student' &&
            CourseStudentHomeWorks.map((HomeWork, i) => {
              return (
                <Row key={i}>
                  <CourseStudentHomeWorkCell
                    id={HomeWork.id}
                    Title={HomeWork.title}
                    DeadLine={toDateTimeString(HomeWork.deadline)}
                    Status={HomeWork.grade > 0 ? "Graded" : "Not graded"}
                    onClick={() => onClickStudent(HomeWork)}
                  />
                </Row>
              );
            })}
        </Card.Text>
      </Card.Body>
    </Card>
   
  );
}
