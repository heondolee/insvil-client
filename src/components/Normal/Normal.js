import React, { useEffect, useState, useCallback } from 'react';
import { Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton, Button, Spinner, Pagination } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';
import styles from '../../css/Effect.module.css'; // 모듈 import
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DownloadButton from '../Long/DownloadBtn';
import { useAuth } from '../Context/AuthProvider';

const API_URL = process.env.REACT_APP_API_URL;

const Normal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
  const [startDate, setStartDate] = useState('2000-01-01');
  const [endDate, setEndDate] = useState('2100-12-31');
  const [dateType, setDateType] = useState('contractDate');
  const [contractStatus, setContractStatus] = useState('statusAll');
  const [contractCompany, setContractCompany] = useState('allCompany');
  const [policyholder, setPolicyholder] = useState(''); // 계약자
  const [insuredPerson, setInsuredPerson] = useState(''); // 피보험자
  const [manager, setManager] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/normal/date-range`, {
        startDate,
        endDate,
        dateType,
        contractStatus,
        contractCompany,
        manager,
        policyholder,
        insuredPerson,
        policyNumber,
        user
      });
      setData(response.data.normals);
      setCurrentPage(1); // 새로운 데이터를 가져올 때 페이지를 첫 페이지로 초기화
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }, [startDate, endDate, dateType, contractStatus, contractCompany, policyholder, insuredPerson, manager, policyNumber, user]);

  const location = useLocation();

useEffect(() => {
  if (location.state) {
    const {
      startDate, endDate, dateType, contractStatus, contractCompany,
      policyholder, insuredPerson, manager, policyNumber,
      selectedYear, selectedMonth, currentPage
    } = location.state;

    if (startDate) setStartDate(startDate);
    if (endDate) setEndDate(endDate);
    if (dateType) setDateType(dateType);
    if (contractStatus) setContractStatus(contractStatus);
    if (contractCompany) setContractCompany(contractCompany);
    if (policyholder) setPolicyholder(policyholder);
    if (insuredPerson) setInsuredPerson(insuredPerson);
    if (manager) setManager(manager);
    if (policyNumber) setPolicyNumber(policyNumber);
    if (selectedYear) setSelectedYear(selectedYear);
    if (selectedMonth) setSelectedMonth(selectedMonth);

    setTimeout(() => {
      fetchData();
      setCurrentPage(currentPage || 1);
    }, 0);
  } else {
    fetchData();
  }
}, [fetchData]);

  const formatNumber = (num) => {

    const numStr = num.toString();

    if (!numStr.includes(',')) {
      const formattedNum = new Intl.NumberFormat().format(num);
      return formattedNum;
    } else {
      return numStr;
    }
  };

  const formatTerm = (totalTerm) => {
    return `0/${totalTerm}`;
  };

  const handleCreateNew = () => {
    navigate('/normal/new');
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
    const months = [1,2,3,4,5,6,7,8,9,10,11,12];
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
                      : contractStatus === 'statusTerminate'
                      ? '해지'
                      : contractStatus === 'statusNew'
                      ? '신규'
                      : contractStatus === 'statusRenewal'
                      ? '갱신'
                      : '전체'
                  }
                  onSelect={(eventKey) => setContractStatus(eventKey)}
                >
                  <Dropdown.Item eventKey="statusAll">전체</Dropdown.Item>
                  <Dropdown.Item eventKey="statusTerminate">해지</Dropdown.Item>
                  <Dropdown.Item eventKey="statusNew">신규</Dropdown.Item>
                  <Dropdown.Item eventKey="statusRenewal">갱신</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Col>
            <Col xs={12} md={1}>
              <Form.Group controlId="formpolicyholder">
                <Form.Label>계약자 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='계약자:'
                  value={policyholder}
                  onChange={(e) => setPolicyholder(e.target.value)}
                  className={styles.form_control_custom}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={1}>
              <Form.Group controlId="formInsuredPerson">
                <Form.Label>피보험자 :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='피보험자:'
                  value={insuredPerson}
                  onChange={(e) => setInsuredPerson(e.target.value)}
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
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
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
          </Row>
          <div className={styles.custom_row}>
            <div>
              <Form.Group controlId="formYear">
                <DropdownButton
                  variant="outline-secondary"
                  title={`${selectedYear}년`}
                  onSelect={(eventKey) => setSelectedYear(Number(eventKey))}
                >
                  {Array.from({ length: 10 }, (_, i) => (
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
            <Form.Group controlId="formContractStatus">
              {/* <Form.Label>계약상태 :</Form.Label> */}
              <DropdownButton
                variant="outline-secondary"
                title={
                  contractCompany === 'allCompany'
                    ? '회사전체'
                    : contractCompany === 'kbsb'
                    ? 'KB손보'
                    : contractCompany === 'samsung'
                    ? '삼성화재'
                    : contractCompany === 'meritz'
                    ? '메리츠화재'
                    : contractCompany === 'dbsb'
                    ? 'DB손보'
                    : contractCompany === 'hyundai'
                    ? '현대해상'
                    : contractCompany === 'mgsb'
                    ? 'MG손보'
                    : '회사전체'
                }
                onSelect={(eventKey) => setContractCompany(eventKey)}
              >
                <Dropdown.Item eventKey="allCompany">회사전체</Dropdown.Item>
                <Dropdown.Item eventKey="kbsb">KB손보</Dropdown.Item>
                <Dropdown.Item eventKey="samsung">삼성화재</Dropdown.Item>
                <Dropdown.Item eventKey="meritz">메리츠화재</Dropdown.Item>
                <Dropdown.Item eventKey="dbsb">DB손보</Dropdown.Item>
                <Dropdown.Item eventKey="hyundai">현대해상</Dropdown.Item>
                <Dropdown.Item eventKey="mgsb">MG손보</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            {user.userCode !== 4 && (
              <Col xs={12} md="auto">
                <DownloadButton modelName="normal" startDate={startDate} endDate={endDate} dateType={dateType} responsibleName={manager}/>
              </Col>
            )}
          </div>
        </Form>
        <div>
          <span>[ 납입보험료 합계 :  {calculateTotalInsurance('insurancePremium')}원 ] [ 총 {data.length}건 ]</span>
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
                    <td>{item.birthdateGender}</td>
                    <td>
                      <Link
                        to={`/normal/${item.id}`}
                        state={{
                          startDate,
                          endDate,
                          dateType,
                          contractStatus,
                          contractCompany,
                          policyholder,
                          insuredPerson,
                          manager,
                          policyNumber,
                          selectedYear,
                          selectedMonth,
                          currentPage
                        }}
                      >
                        {item.insuredPerson}
                      </Link>
                    </td>
                    <td>{item.policyholder}</td>
                    <td>{item.policyNumber}</td>
                    <td>{item.branch}</td>
                    <td>{item.team}</td>
                    <td>{item.manager}</td>
                    <td>{formatNumber(item.insurancePremium)}</td>
                    <td>{formatNumber(item.revisedPremium)}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.contractStatus}</td>
                    <td>{formatTerm(item.totalPayments)}</td>
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

export default Normal;
