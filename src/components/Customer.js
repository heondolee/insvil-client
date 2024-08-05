import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchParams, setSearchParams] = useState({
    담당: '',
    이름: '',
    생년월일: '',
    전화번호: '',
    핸드폰: '',
    등록일: ''
  });

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
      const response = await axios.get(`${API_URL}/customer/list`, { params: searchParams });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row className="my-3">
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formManager">
                    <Form.Label>담당</Form.Label>
                    <Form.Control
                      type="text"
                      name="담당"
                      value={searchParams.담당}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      name="이름"
                      value={searchParams.이름}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBirthdate">
                    <Form.Label>생년월일</Form.Label>
                    <Form.Control
                      type="text"
                      name="생년월일"
                      value={searchParams.생년월일}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>전화번호</Form.Label>
                    <Form.Control
                      type="text"
                      name="전화번호"
                      value={searchParams.전화번호}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formMobile">
                    <Form.Label>핸드폰</Form.Label>
                    <Form.Control
                      type="text"
                      name="핸드폰"
                      value={searchParams.핸드폰}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formRegistrationDate">
                    <Form.Label>등록일</Form.Label>
                    <Form.Control
                      type="text"
                      name="등록일"
                      value={searchParams.등록일}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Button variant="primary" onClick={handleSearch}>검색</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover>
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
