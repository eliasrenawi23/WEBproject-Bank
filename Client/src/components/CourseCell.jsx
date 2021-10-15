import React, {useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import { useDispatch } from "react-redux";

export default function CourseCell({course, onClick}) {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

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

    <Container 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onContainerClick}
      className={`course-cell Container ${
        isHovering ? ' shadow-lg' : 'shadow '
      } p-4 mb-5 bg-white rounded `}
    >
      {course && (
        <>
          <Row className="course-title">{course[0].title}</Row>
          <TeachersNames teachers={course} />
        </>
      )}
    </Container>

  );
}

const TeachersNames = ({teachers}) => {
  return (
    <>
      <p>Teachers:</p>
      <div className="course-teachers-names">
        {teachers.map((tch, i) => (
          <TeacherName key={i} teacher={tch} />
          
        ))}
      </div>
    </>
  );
};

const TeacherName = ({teacher}) => {
  return (
    <div className="teacher-name-clickable">{`${teacher.fname} ${teacher.lname}`}</div>
  );
};
