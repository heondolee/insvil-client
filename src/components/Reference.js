import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Reference.module.css'; // 모듈 import
import axios from 'axios';
import { Link } from 'react-router-dom'; // Update import

const API_URL = process.env.REACT_APP_API_URL;

const Reference = () => {
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/dataroom`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching Posts:", error);
    }
  };

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.
    try {
      const response = await axios.post(`${API_URL}/dataroom`, {
        searchKeyword
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row className="my-3">
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
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
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
        <Row>
          <Col>
            <Table bordered striped className={styles.table_custom}>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>제목</th>
                  <th style={{ width: '60%' }}>내용</th>
                  <th style={{ width: '15%' }}>날짜</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td><Link to={`/reference/${post.id}`}>{post.Title}</Link></td>
                    <td>{truncateContent(post.Content, 80)}</td>
                    <td>{post.Date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reference;
