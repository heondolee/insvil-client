import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, Table, Container, Row, Col, InputGroup } from 'react-bootstrap';
import Navigation from './layouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';
import './css/Long.css'; // CSS 파일 임포트

const API_URL = process.env.REACT_APP_API_URL;

const Long = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('2024-07-31');
  const [endDate, setEndDate] = useState('2024-07-31');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(`${API_URL}/long/date-range`, {
        startDate,
        endDate
      });
      setData(response.data.longs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 숫자를 1,000 단위로 구분하는 함수
  const formatNumber = (num) => {
    const formattedNum = new Intl.NumberFormat().format(num * 1000);
    return formattedNum;
  };

  // 회차를 0/120 형식으로 변환하는 함수
  const formatTerm = (totalTerm) => {
    return `0/${totalTerm}`;
  };

  return (
    <div>
      <Navigation />
      <Container>
        <h1>장기 보험 페이지</h1>
        <Form>
          <Row className="align-items-center">
            <Col>
              <Form.Group controlId="formDateRange">
                <Form.Label>계약일</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" onClick={fetchData}>
                조회
              </Button>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover className="table-custom">
          <thead>
            <tr>
              <th>계약일</th>
              <th>보험회사</th>
              <th>보험상품</th>
              <th>생년월일 / 성별</th>
              <th>피보험자</th>
              <th>계약자</th>
              <th>증권번호</th>
              <th>지점</th>
              <th>팀</th>
              <th>담당</th>
              <th>납입보</th>
              <th>수정보</th>
              <th>납입</th>
              <th>상태</th>
              <th>회차</th>
              <th>업무</th>
              <th>자필서명</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.contractDate}</td>
                <td>{item.contractCompany}</td>
                <td>{item.longTermProduct}</td>
                <td>{item.birthdate_gender}</td>
                <td>{item.insuredPerson}</td>
                <td>{item.contractor}</td>
                <td>{item.policyNumber}</td>
                <td>{item.branch}</td>
                <td>{item.team}</td>
                <td>{item.responsible}</td>
                <td>{formatNumber(item.paymentInsurance)}</td>
                <td>{formatNumber(item.correctedInsurance)}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.contractStatus}</td>
                <td>{formatTerm(item.totalTerm)}</td>
                <td>{item.counselor}</td>
                <td>{item.customerCounselingContent}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Long;
