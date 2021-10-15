import React, { useEffect, useState } from "react";
import {
  setHomeWorksActive,
  currentHomeworkStudent,
  setHomeWorkActive,
} from "../data/Global";
import { useSelector, useDispatch } from "react-redux";
import SpecificHomeWorkCell from "../components/SpecificHomeWorkCell";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import { Card } from "@material-ui/core";
import Card from 'react-bootstrap/Card';


export default function HomeworkStudentView() {
  const student_hw = useSelector(currentHomeworkStudent);
  const [hwDetails, setSubmittedHomeWork] = useState("");
  // var SubmittedHomeWork;
  const dispatch = useDispatch();
  useEffect(() => {

  }, []);

  useEffect(() => {
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));
  }, []);
  return (
    <>
      <Card className="Login card-page">

        <Card.Header as="h5">
          <h1 className=" p-3 mb-3">{hwDetails.title}</h1>
          <h4 className=" p-3 mb-3">{hwDetails.description}</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title> </Card.Title>
          <Card.Text>
            <Row>
              {hwDetails && (
                <SpecificHomeWorkCell
                  id={hwDetails.studentId}
                  SubmissionId={hwDetails.id}
                  name={hwDetails.Name}
                  submitteddate={hwDetails.updatedAt}
                  homeworkfile={hwDetails.homeworkfile}
                  Status={hwDetails.status}
                  Grade={hwDetails.grade}
                  deadline={hwDetails.deadline}
                  allcommentssorted={hwDetails.AllCommentsSorted}
                />
              )}
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
  
    </>
  );
}
