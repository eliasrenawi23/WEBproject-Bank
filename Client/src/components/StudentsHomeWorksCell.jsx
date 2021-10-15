import React, {useState} from 'react';
import {Container, Row} from 'react-bootstrap';

export default function StudentsHomeWorksCell({
  id,
  SubmissionsDate,
  Status,
  onClick,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      className={`Container ${isHovering ? ' shadow-lg' : 'shadow '}${
        Status == 'Submitted'
          ? 'CourseSubmittedHomeWork'
          : 'CourseNotSubmittedHomeWork'
      } p-4 mb-5 rounded `}
    >
      <Row>id: {id}</Row>
      <Row>Submissions Date: {SubmissionsDate}</Row>
      <Row>Status: {Status}</Row>
    </Container>
  );
}
