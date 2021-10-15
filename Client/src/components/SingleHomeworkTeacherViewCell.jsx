import React, {useState} from 'react';
import {Container, Row} from 'react-bootstrap';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  setCurrentHomeworkStudent,
  currentHomeworkStudent,
} from '../data/Global';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {UpdateGrade} from '../API/API';
import Comment from './Comment';

export default function SingleHomeworkTeacherViewCell({
  id,
  SubmissionId,
  name,
  submitteddate,
  homeworkfile,
  Status,
  Grade,
  allcommentssorted,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grade, setgrade] = useState({Grade});
  const [comment, setcomment] = useState('');
  const history = useHistory();
  // const dispatch = useDispatch();
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const handleComment = (g) => {
    setcomment(g.target.value);
  };
  const handleGrade = (g) => {
    setgrade(g.target.value);
  };
  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onClickSave = () => {
    UpdateGrade(SubmissionId, grade);
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
      className={`Container ${isHovering ? ' shadow-lg' : 'shadow '} ${
        Status == 'Submitted'
          ? 'CourseSubmittedHomeWork'
          : 'CourseNotSubmittedHomeWork'
      }p-4 mb-5 rounded `}
    >
      <Row>
        <Col className="HomeWorkContent">ID:</Col>
        <Col className="HomeWorkContent">{id}</Col>
      </Row>
      <Row>
        <Col className="HomeWorkContent2">Name:</Col>
        <Col className="HomeWorkContent2">{name}</Col>{' '}
      </Row>
      <Row>
        <Col className="HomeWorkContent">Submitted-Date:</Col>
        <Col className="HomeWorkContent">{submitteddate}</Col>
      </Row>
      <Row>
        <Col className="HomeWorkContent2">HomeWork-File:</Col>
        <Col className="HomeWorkContent2">{homeworkfile}</Col>{' '}
      </Row>
      <Row>
        <Col className="HomeWorkContent">Status:</Col>
        <Col className="HomeWorkContent">{Status}</Col>
      </Row>
      <Row>
        <Col className="HomeWorkContent2">Grade:</Col>
        <Col className="HomeWorkContent2">
          <input
            className="Grade-Style"
            value={grade}
            onChange={handleGrade}
          ></input>
        </Col>{' '}
      </Row>

      <Row>
        <Col className="HomeWorkContent">Comments:</Col>
        <Col>
          {allcommentssorted &&
            allcommentssorted.map((comment, i) => {
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
