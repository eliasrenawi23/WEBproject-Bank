import React from "react";
import {Row, Col} from "react-bootstrap";
import { timeFromDateISO, toDateString } from "../Util/TimeUtil";
const Comment = ({comment}) => {
  return (
    <>
      <Row >
        <Col>{comment.content}</Col>
        <Col>{comment.authorFullName}</Col>
        <Col>{timeFromDateISO(comment.createdAt)}</Col>
      </Row>
    </>
  );
};

export default Comment;
