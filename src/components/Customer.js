import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Customer.module.css'; // 모듈 import
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [customerName, setcustomerName] = useState('');

  useEffect(() => {
    // Initial data load
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

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${API_URL}/customer/list`, {
        customerName
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row className="my-3">
          <Col>
            <Form>
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
                      onChange={(e) => setcustomerName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" onClick={handleSearch}>검색</Button>
                </Col>
              </Row>
              <Row className="mt-3">
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
                    <td>{customer.customerName}</td>
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
