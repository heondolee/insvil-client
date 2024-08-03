import React, { useEffect, useState, useCallback } from 'react';
import { Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Navigation from './layouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';
import styles from './css/Long.module.css'; // 모듈 import

const API_URL = process.env.REACT_APP_API_URL;

const Long = () => {
  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(getCurrentDate()); // 기본값을 현재 날짜로 설정
  const [endDate, setEndDate] = useState(getCurrentDate()); // 기본값을 현재 날짜로 설정
  const [dateType, setDateType] = useState('contractDate'); // 날짜 유형 상태 추가

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(`${API_URL}/long/date-range`, {
        startDate,
        endDate,
        dateType, // 날짜 유형을 요청에 포함
      });
      setData(response.data.longs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [startDate, endDate, dateType]);

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
        <Form>
          <Row className="align-items-center">
            <Col>
              <Form.Group controlId="formDateRange">
                {/* <Form.Label>날짜 유형</Form.Label> */}
                <DropdownButton
                  variant="outline-secondary"
                  title={dateType === 'contractDate' ? '계약일' : dateType === 'expiryDate' ? '만기일' : '개시일'}
                  onSelect={(eventKey) => setDateType(eventKey)}
                >
                  <Dropdown.Item eventKey="contractDate">계약일</Dropdown.Item>
                  <Dropdown.Item eventKey="coverageStartDate">개시일</Dropdown.Item>
                  <Dropdown.Item eventKey="expiryDate">만기일</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDateRange">
                {/* <Form.Label>기간 선택</Form.Label> */}
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
          </Row>
        </Form>
        <Table striped bordered hover className={styles.table_custom}>
          <thead>
            <tr>
              <th className={styles.contract_date}>계약일</th>
              <th className={styles.insurance_company}>보험회사</th>
              <th>보험상품</th>
              <th className={styles.birth_gender}>생년월일 / 성별</th>
              <th className={styles.name}>피보험자</th>
              <th className={styles.name}>계약자</th>
              <th>증권번호</th>
              <th>지점</th>
              <th>팀</th>
              <th className={styles.name}>담당</th>
              <th>납입보</th>
              <th>수정보</th>
              <th className={styles.name}>납입</th>
              <th className={styles.name}>상태</th>
              <th>회차</th>
              <th className={styles.name}>업무</th>
              <th className={styles.sign}>자필서명</th>
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
