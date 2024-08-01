import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();


  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setModalMessage('아이디와 비밀번호를 모두 입력하세요.');
      setShowModal(true);
    } else {
      try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.success) {
          // setModalMessage('로그인 성공');
          navigate('/long');
        } else {
          setModalMessage(response.data.message || '로그인 실패');
        }
      } catch (error) {
        setModalMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
      setShowModal(true);
    }
  }, [username, password, API_URL, navigate]); // API_URL을 의존성 배열에 추가

  const handleClose = () => setShowModal(false);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center">INSVIL 로그인</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디를 입력하세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
          <div className="mt-3">
            <Link to="/signup">회원가입하기</Link>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
