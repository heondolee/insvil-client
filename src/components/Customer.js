import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Customer.module.css'; // 모듈 import
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Update import
import DownloadButton from './Long/DownloadBtn';

const API_URL = process.env.REACT_APP_API_URL;

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/customer/list`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.
    try {
      const response = await axios.post(`${API_URL}/customer/list`, {
        customerName
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  const handleCreateNew = () => {
    navigate('/customer/new');
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row className="my-3">
          <Col>
            <Form onSubmit={handleSearch}> {/* onSubmit 이벤트 핸들러 추가 */}
              <Row>
                <Col xs={12} md="auto">
                  <Form.Label>이름</Form.Label>
                </Col>
                <Col xs={12} md="auto">
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      name="이름"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">검색</Button> {/* 버튼 타입을 submit으로 변경 */}
                </Col>
                <Col xs={12} md="auto">
                  <DownloadButton modelName="customer"/>
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
                  <th>이름</th>
                  <th>생년월일/성별</th>
                  <th>전화</th>
                  <th>핸드폰</th>
                  <th>회사명</th>
                  <th>회사번호</th>
                  <th>이메일</th>
                  <th>팩스</th>
                  <th>담당</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td><Link to={`/customer/${customer.customerName}`}>{customer.customerName}</Link></td>
                    <td>{customer.birthdate}/{customer.gender}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.mobilePhone}</td>
                    <td>{customer.companyName}</td>
                    <td>{customer.companyPhone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.fax}</td>
                    <td>{customer.responsibleName}</td>
                    <td>{customer.registrationDate}</td>
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

export default Customer;
