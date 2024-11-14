import React, { useEffect, useState, useCallback } from 'react';
import { ToggleButton, ToggleButtonGroup, ButtonGroup, Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton, Button, Spinner, Pagination } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DownloadButton from '../Long/DownloadBtn';
import { useAuth } from '../Context/AuthProvider';

import styles from '../../css/Effect.module.css'; // 모듈 import

const API_URL = process.env.REACT_APP_API_URL;

const Car = () => {
  const { user, isCar, setIsCar } = useAuth();
  const navigate = useNavigate(); 

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 기본 현재 달 선택

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [dateType, setDateType] = useState('endDate');

  const [contractor, setContractor] = useState('');
  const [responsibilityName, setResponsibilityName] = useState('');
  const [carNumber, setcarNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/car/date-range`, {
        startDate,
        endDate,
        dateType,
        contractor,
        responsibilityName,
        carNumber,
        user,
        isCar
      });
      setData(response.data.cars);
      setCurrentPage(1); // 새로운 데이터를 가져올 때 페이지를 첫 페이지로 초기화
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }, [startDate, endDate, dateType, contractor, responsibilityName, carNumber, user, isCar]);

  useEffect(() => {
    fetchData();
  }, [fetchData, isCar]);

  const handleCreateNew = () => {
    navigate('/car/new');
  };

  // 현재 페이지에 맞는 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const calculateTotalInsurance = (key) => {
    const total = data.reduce((sum, item) => {
      let value = item[key];
      if (!value.includes(',')) {
        return sum + Number(value);
      } else {
        return sum + Number(value.replace(/,/g, ''));
      }
    }, 0);
    return new Intl.NumberFormat().format(total);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
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

    if (startPage > 1) {
      paginationItems.unshift(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    if (endPage < totalPages) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    return paginationItems;
  };

  const generateMonths = () => {
    const months = [];
    const currentMonth = new Date().getMonth() + 1;

    for (let i = -2; i <= 2; i++) {
      const month = (currentMonth + i + 12) % 12 || 12; // 1 ~ 12 사이의 값으로 순환
      months.push(month);
    }
    return months;
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);

    // 선택된 월에 맞게 시작일과 종료일을 설정
    const startOfMonth = new Date(selectedYear, month - 1, 2);
    const endOfMonth = new Date(selectedYear, month, 1);

    setStartDate(startOfMonth.toISOString().slice(0, 10)); // 2023-04-01 형식
    setEndDate(endOfMonth.toISOString().slice(0, 10));     // 2023-04-30 형식
  };

  const handleToggle = (value) => {
    setIsCar(value);
  };

  return (
    <div>
      <Navigation />
      <Container>
        <ButtonGroup className="mb-3">
          <ToggleButtonGroup
            type="radio"
            name="options"
            value={isCar}
            // onChange={handleToggle}
          >
            <ToggleButton variant="outline-primary" value="longTerm" onClick={() => handleToggle('longTerm')} >
              자동차 계약리스트
            </ToggleButton>
            <ToggleButton variant="outline-primary" value="design" onClick={() => handleToggle('design')}>
              자동차 설계리스트
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonGroup>
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Row className="align-items-center">
            <Col xs={12} md="auto">
              <Form.Group controlId="formDateType">
                <Form.Label>검색일 :</Form.Label>
                <DropdownButton
                  variant="outline-secondary"
                  title={
                    dateType === 'receiptDate' ? '영수일' : 
                    dateType === 'startDate' ? '개시일' : 
                    '만기일'
                  }
                  onSelect={(eventKey) => setDateType(eventKey)}
                >
                  <Dropdown.Item eventKey="receiptDate">영수일</Dropdown.Item>
                  <Dropdown.Item eventKey="startDate">개시일</Dropdown.Item>
                  <Dropdown.Item eventKey="endDate">만기일</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Col>
            <Col xs={12} md="auto">
            </Col>
            <Col xs={12} md={1}>
              <Form.Group controlId="formContractor">
                <Form.Label>계약자 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='계약자:'
                  value={contractor}
                  onChange={(e) => setContractor(e.target.value)}
                  className={styles.form_control_custom}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group controlId="formcarNumber">
                <Form.Label>차량번호 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='차량번호:'
                  value={carNumber}
                  onChange={(e) => setcarNumber(e.target.value)}
                  className={styles.form_control_custom}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={1}>
              <Form.Group controlId="formResponsibility">
                <Form.Label>담당자 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='이름:'
                  value={responsibilityName}
                  onChange={(e) => setResponsibilityName(e.target.value)}
                  className={styles.form_control_custom}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md="auto">
              <Form.Group controlId="formDateRange">
                <Form.Label>날짜 범위 :</Form.Label>
                <InputGroup className={styles.input_group_custom}>
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
            <Col xs={12} md="auto">
              <Button onClick={fetchData} className={styles.button_custom}>검색</Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  setStartDate(getCurrentDate());
                  setEndDate(getCurrentDate());
                }}
                className={styles.button_custom}
              >오늘날짜</Button>            
            </Col>
            {user.userCode !== 4 && (
              <Col xs={12} md="auto">
                <DownloadButton modelName="car" startDate={startDate} endDate={endDate} dateType={dateType}/>
              </Col>
            )}
          </Row>
          <div className={styles.custom_row}>
            <div>
              <Form.Group controlId="formYear">
                <DropdownButton
                  variant="outline-secondary"
                  title={`${selectedYear}년`}
                  onSelect={(eventKey) => setSelectedYear(Number(eventKey))}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Dropdown.Item key={i} eventKey={new Date().getFullYear() + 3 - i}>
                      {new Date().getFullYear() + 3 - i}년
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Form.Group>
            </div>

            <div className={styles.custom_swiper}>
              {generateMonths().map((month, index) => (
                <div key={index} >
                  <Button
                    onClick={() => handleMonthSelect(month)}
                    active={month === selectedMonth}
                  >
                    {month}월
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Form>
        <div>
          <span>[ 초회보험료 합계 :  {calculateTotalInsurance('firstPremium')}원 ]</span>
        </div>
        {isLoading ? (
          <div className="text-center my-3">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className={styles.table_custom}>
              <thead>
                <tr>
                  <th>영수일</th>
                  <th>보험기간 (개시일 ~ 만기일)</th>
                  <th>전계약사</th>
                  <th>생년월일/성별</th>
                  <th>피보험자</th>
                  <th>계약자</th>
                  <th>차량번호</th>
                  <th>지점</th>
                  <th>팀</th>
                  <th>담당</th>
                  <th>1년</th>
                  <th>초회</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.receiptDate}</td>
                    <td>{`${item.startDate} ~ ${item.endDate}`}</td>
                    <td>{item.previousContractCompany}</td>
                    <td>{item.insuredBirthGender}</td>
                    <td>{item.insured}</td>
                    <td><Link to={`/car/${item.id}`}>{item.contractor}</Link></td>
                    <td><Link to={`/car/${item.id}`}>{item.carNumber}</Link></td>
                    <td>{item.branch}</td>
                    <td>{item.team}</td>
                    <td>{item.personInCharge}</td>
                    <td>
                      {typeof item.firstPremium === 'number' || !String(item.firstPremium).includes(',')
                        ? new Intl.NumberFormat().format(item.firstPremium)
                        : item.firstPremium}
                    </td>
                    <td>{typeof item.oneYearPremium === 'number' || !String(item.oneYearPremium).includes(',')
                        ? new Intl.NumberFormat().format(item.oneYearPremium)
                        : item.oneYearPremium}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
              {renderPaginationItems()}
              <Pagination.Next onClick={() => handlePageChange(currentPage < Math.ceil(data.length / itemsPerPage) ? currentPage + 1 : Math.ceil(data.length / itemsPerPage))} />
              <Pagination.Last onClick={() => handlePageChange(Math.ceil(data.length / itemsPerPage))} />
              <Col xs={12} md="auto">
                  <Button onClick={handleCreateNew}>작성</Button>
              </Col>
            </Pagination>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Car;
