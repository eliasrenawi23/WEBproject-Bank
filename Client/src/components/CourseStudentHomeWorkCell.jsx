import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

export default function CourseStudentHomeWorkCell({ id,Title, DeadLine, Status,onClick }) {

  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onContainerClick = () => {
    
    
    onClick()
  };
  return (

    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onContainerClick}
      className={`Container ${
        isHovering ? " shadow-lg" : "shadow "
      }${
        Status=="Submitted" ? "CourseSubmittedHomeWork" : "CourseNotSubmittedHomeWork"
      } p-4 mb-5 rounded `}
      
    >
      <Row>{Title}</Row>
      <Row>DeadLine: {DeadLine}</Row>
      <Row>Status: {Status}</Row>
    </Container>
  );
    
}
