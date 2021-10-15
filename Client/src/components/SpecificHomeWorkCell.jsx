import React, {useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import {toDateString} from '../Util/TimeUtil';
import Comment from './Comment';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';

export default function SpecificHomeWorkCell({
  id,
  SubmissionId,
  name,
  deadline,
  submitteddate,
  homeworkfile,
  Status,
  Grade,
  allcommentssorted,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const history = useHistory();

  const handleDrop = (acceptedFiles) =>
    setFileNames(acceptedFiles.map((file) => file.name));
  const onMouseEnter = () => {
    setIsHovering(true);
  };
  const [comment, setcomment] = useState('');

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const handleComment = (g) => {
    setcomment(g.target.value);
  };
  const onContainerClick = () => {
    // onClick()
  };
  const onClickSave = () => {
    history.push('/HomeworksTeacherView');
    //dispatch(setCurrentHomeworkStudent(HomeWork))
  };
  const onClickcCancel = () => {
    history.push('/HomeworksTeacherView');
    //dispatch(setCurrentHomeworkStudent(HomeWork))
  };
  return (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      //  onClick={onContainerClick}
      className=" shadow-lg"
    >
      <Row>
        <Col className="HomeWorkContent">Status:</Col>
        <Col className="HomeWorkContent">{Status}</Col>
      </Row>
      <Row>
        <Col className="HomeWorkContent2">Grade:</Col>
        <Col className="HomeWorkContent2">{Grade}</Col>{' '}
      </Row>
      <Row>
        <Col className="HomeWorkContent">DeadLine:</Col>
        <Col className="HomeWorkContent">{deadline}</Col>{' '}
      </Row>
      <Row>
        <Col className="HomeWorkContent2">TimeLeft:</Col>
        <Col className="HomeWorkContent2">11 Days</Col>{' '}
      </Row>
      <Row>
        <Col className="HomeWorkContent">Comments:</Col>
        <Col>
          {allcommentssorted.map((comment, i) => {
            return <Comment key={i} comment={comment} />;
          })}
        </Col>
      </Row>
      <Row className="HomeWorkContent">
        <Col>
          <Row>
            <Button onClick={() => onClickcCancel()}>Cancel</Button>
          </Row>
          <Row>
            {' '}
            <Button onClick={() => onClickSave()}>Save</Button>
          </Row>
        </Col>
        <Col>
          <textarea
            className="Comment-style"
            value={comment}
            onChange={handleComment}
          ></textarea>
        </Col>
      </Row>
    </Container>
  );
}
