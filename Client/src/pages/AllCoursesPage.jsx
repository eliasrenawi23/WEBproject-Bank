import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CourseCell from '../components/CourseCell';
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
import {getUserCourses} from '../API/API';
import {Button} from 'react-bootstrap';
const axios = require('axios');


export default function MainPage() {
  const history = useHistory();
  const [coursesData, setCoursesData] = useState([]);
  const user = useSelector(currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getUserCourses(user.id).then((res1) => {
        const rawData = res1.data;

        let d = new Map();
        rawData.forEach((r) => {
          if (!d.has(r.cid)) {
            d.set(r.cid, []);
          }
          d.get(r.cid).push(r);
        });
        const crses = [];
        d.forEach((v, k) => {
          crses.push(v);
        });

        setCoursesData(crses);
        setIsLoading(false);
      });
      dispatch(setIsAddHomeworkHidden(false));

      dispatch(setCourseActive(true));
      dispatch(setHomeWorkActive(true));
      dispatch(setHideSubmissionDetails(true));
      dispatch(setIsAddCourseHidden(true));
    }
  }, [user]);

  const onCourseClick = (course) => {
    
    dispatch(setCurrentCourse(course));
    dispatch(setCurrentCourseTitle(course[0].title));
    history.push('/Course');
  };

  const onAddCourseClicked = () => {
    dispatch(setIsAddCourseHidden(false));
    history.push('/CourseForm');
  };
  return (
    <Card className="card-page">
       <Card.Header as="h5"> Courses </Card.Header>
       <Card.Body>
          <Card.Title>
          {user && user.type === 'teacher' && (
            <div className="pb-5">
              <Button className="float-right mb-2" onClick={onAddCourseClicked}>
                Add Course
              </Button>
            </div>
          )}
          </Card.Title>
          <Card.Text>
          {!isLoading ? (
            coursesData &&
            coursesData.length > 0 &&
            coursesData.map((course, index) => {
              return (
                <Row key={index}>
                  <CourseCell
                    course={course}
                    onClick={() => onCourseClick(course)}
                  />
                </Row>
              );
            })
          ) : (
            <p>Loading courses...</p>
          )}
          </Card.Text>
       </Card.Body>
    </Card>

  );
}
