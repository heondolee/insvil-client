import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Customer.module.css'; // 모듈 import
import axios from 'axios';
import { Link } from 'react-router-dom'; // Update import

const API_URL = process.env.REACT_APP_API_URL;

const Reference = () => {
  const [writerName, setWriterName] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.
    try {
      const response = await axios.post(`${API_URL}/reference`, {
        writerName
      });
      setWriterName(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSearch}>
              <Row>
                <Col xs={12} md="auto">
                  <Form.Label>제목</Form.Label>
                </Col>
                <Col xs={12} md="auto">
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      name="제목"
                      value={writerName}
                      onChange={(e) => setWriterName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">검색</Button> 
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reference;
