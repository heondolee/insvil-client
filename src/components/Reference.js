import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Reference.module.css'; // 모듈 import
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Update import
import DownloadButton from './Long/DownloadBtn';

const API_URL = process.env.REACT_APP_API_URL;

const Reference = () => {
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 페이지 번호 상태 추가
  const itemsPerPage = 13; // 페이지당 아이템 수

  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

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
      setCurrentPage(1); // 검색 결과가 나올 때 페이지를 첫 페이지로 초기화
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleCreateNew = () => {
    navigate('/reference/new');
  };

  // 페이지에 맞는 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const maxPageNumbersToShow = 10;
    const paginationItems = [];

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageNumbersToShow) {
      if (currentPage <= Math.ceil(maxPageNumbersToShow / 2)) {
        endPage = maxPageNumbersToShow;
      } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
        startPage = totalPages - maxPageNumbersToShow + 1;
      } else {
        startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
        endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return paginationItems;
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
                <Col xs={12} md="auto">
                  <DownloadButton modelName="reference" initialPart={1} />
                </Col>
                <Col xs={12} md="auto">
                  <Button onClick={handleCreateNew}>작성</Button>
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
                {currentItems.map((post, index) => (
                  <tr key={index}>
                    <td><Link to={`/reference/${post.id}`}>{post.Title}</Link></td>
                    <td>{truncateContent(post.Content, 80)}</td>
                    <td>{post.Date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
              {renderPaginationItems()}
              <Pagination.Next onClick={() => handlePageChange(currentPage < Math.ceil(posts.length / itemsPerPage) ? currentPage + 1 : Math.ceil(posts.length / itemsPerPage))} />
              <Pagination.Last onClick={() => handlePageChange(Math.ceil(posts.length / itemsPerPage))} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reference;
