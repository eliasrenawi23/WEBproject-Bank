import React, {useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import {toDateTimeString} from '../Util/TimeUtil';

export default function SubmissionCell({submission, onClick}) {
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
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onContainerClick}
      className={`submission-container ${isHovering ? ' shadow-lg' : 'shadow '}${
        submission.grade >= 0
          ? 'CourseSubmittedHomeWork border border-success'
          : 'CourseNotSubmittedHomeWork border border-danger'
      } p-4 mb-5 rounded `}
    >
      <Row>Student ID: {submission.studentid}</Row>
      <Row>Submitted at: {toDateTimeString(submission.createdat)}</Row>
    </Container>
  );
}
