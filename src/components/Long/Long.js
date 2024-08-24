import React, { useEffect, useState, useCallback } from 'react';
import { Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton, Button, Spinner, Pagination } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';
import styles from '../../css/Effect.module.css'; // 모듈 import
import { Link, useNavigate } from 'react-router-dom';
import DownloadButton from './DownloadBtn';

const API_URL = process.env.REACT_APP_API_URL;

const Long = () => {
  const navigate = useNavigate(); 

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2100-12-31');
  const [dateType, setDateType] = useState('contractDate');
  const [contractStatus, setContractStatus] = useState('statusAll');
  const [contractor, setContractor] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/long/date-range`, {
        startDate,
        endDate,
        dateType,
        contractStatus,
        responsibleName,
        contractor,
        policyNumber
      });
      setData(response.data.longs);
      setCurrentPage(1); // 새로운 데이터를 가져올 때 페이지를 첫 페이지로 초기화
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }, [startDate, endDate, dateType, contractStatus, contractor, responsibleName, policyNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatNumber = (num) => {
    if (!num.includes(',')) {
      const formattedNum = new Intl.NumberFormat().format(num * 1000);
      return formattedNum;
    } else {
      return num;
    }
  };

  const formatTerm = (totalTerm) => {
    return `0/${totalTerm}`;
  };

  const handleCreateNew = () => {
    navigate('/long/new');
  };

  // 현재 페이지에 맞는 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div>
      <Navigation />
      <Container>
        <Form>
          <Row className="align-items-center">
            <Col xs={12} md="auto">
              <Form.Group controlId="formDateType">
                <Form.Label>검색일 :</Form.Label>
                <DropdownButton
                  variant="outline-secondary"
                  title={
                    dateType === 'contractDate' ? '계약일' : 
                    dateType === 'paymentEndDate' ? '만기일' : 
                    '개시일'
                  }
                  onSelect={(eventKey) => setDateType(eventKey)}
                >
                  <Dropdown.Item eventKey="contractDate">계약일</Dropdown.Item>
                  <Dropdown.Item eventKey="paymentStartDate">개시일</Dropdown.Item>
                  <Dropdown.Item eventKey="paymentEndDate">만기일</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Col>
            <Col xs={12} md="auto">
              <Form.Group controlId="formContractStatus">
                <Form.Label>계약상태 :</Form.Label>
                <DropdownButton
                  variant="outline-secondary"
                  title={
                    contractStatus === 'statusAll'
                      ? '전체'
                      : contractStatus === 'statusMaintain'
                      ? '유지'
                      : contractStatus === 'statusLapse'
                      ? '실효'
                      : contractStatus === 'statusTerminate'
                      ? '해지'
                      : contractStatus === 'statusWithdraw'
                      ? '철회'
                      : contractStatus === 'statusCancel'
                      ? '취소'
                      : contractStatus === 'statusExpire'
                      ? '만기'
                      : '전체'
                  }
                  onSelect={(eventKey) => setContractStatus(eventKey)}
                >
                  <Dropdown.Item eventKey="statusAll">전체</Dropdown.Item>
                  <Dropdown.Item eventKey="statusMaintain">유지</Dropdown.Item>
                  <Dropdown.Item eventKey="statusLapse">실효</Dropdown.Item>
                  <Dropdown.Item eventKey="statusTerminate">해지</Dropdown.Item>
                  <Dropdown.Item eventKey="statusWithdraw">철회</Dropdown.Item>
                  <Dropdown.Item eventKey="statusCancel">취소</Dropdown.Item>
                  <Dropdown.Item eventKey="statusExpire">만기</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
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
              <Form.Group controlId="formPolicyNumber">
                <Form.Label>증권번호 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='증권번호:'
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  className={styles.form_control_custom}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={1}>
              <Form.Group controlId="formResponsible">
                <Form.Label>담당자 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='이름:'
                  value={responsibleName}
                  onChange={(e) => setResponsibleName(e.target.value)}
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
            <Col xs={12} md="auto">
            <DownloadButton modelName="long"/>
            </Col>
          </Row>
        </Form>
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
                  <th className={styles.contract_date}>계약일</th>
                  <th className={styles.contract_date}>개시일</th>
                  <th className={styles.contract_date}>만기일</th>
                  <th className={styles.insurance_company}>보험회사</th>
                  <th>보험상품</th>
                  <th className={styles.birth_gender}>생년월일 / 성별</th>
                  <th className={styles.name}>피보험자</th>
                  <th className={styles.name}>계약자</th>
                  <th>증권번호</th>
                  <th>지점</th>
                  <th>팀</th>
                  <th>담당</th>
                  <th>납입보</th>
                  <th>수정보</th>
                  <th className={styles.name}>납입</th>
                  <th className={styles.name}>상태</th>
                  <th>회차</th>
                  <th className={styles.name}>업무</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.contractDate}</td>
                    <td>{item.paymentStartDate}</td>
                    <td>{item.paymentEndDate}</td>
                    <td>{item.contractCompany}</td>
                    <td>{item.longTermProduct}</td>
                    <td>{item.birthdate_gender}</td>
                    <td>{item.insuredPerson}</td>
                    <td><Link to={`/long/${item.id}`}>{item.contractor}</Link></td>
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

export default Long;
