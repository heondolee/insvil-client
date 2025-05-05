import React, { useEffect, useState, useCallback } from 'react';
import { Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton, Button, Spinner, Pagination } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';
import styles from '../../css/Effect.module.css'; // 모듈 import
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DownloadButton from './DownloadBtn';
import { useAuth } from '../Context/AuthProvider';


const API_URL = process.env.REACT_APP_API_URL;

const Long = () => {
  const { user } = useAuth();
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
  const [dateType, setDateType] = useState('contractDate');
  const [contractStatus, setContractStatus] = useState('statusAll');
  const [contractCompany, setContractCompany] = useState('allCompany');
  const [contractor, setContractor] = useState('');
  const [insuredPerson, setInsuredPerson] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [paymentInsurance, setPaymentInsurance] = useState(0);
  const [correctedInsurance, setCorrectedInsurance] = useState(0);

  const fetchData = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/long/date-range`, {
        startDate,
        endDate,
        dateType,
        contractStatus,
        contractCompany,
        responsibleName,
        contractor,
        insuredPerson,
        policyNumber,
        user,
        page,
        itemsPerPage
      });
      setData(response.data.longs);
      console.log('Long 컴포넌트 responsibleName:', responsibleName);
      setTotalItems(response.data.totalItems);
      setCurrentPage(page); // 페이지 변경
      if (page === 1) {
        setPaymentInsurance(response.data.paymentInsurance); // 납입보험료 합계
        setCorrectedInsurance(response.data.correctedInsurance); // 수정보험료 합계
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }, [startDate, endDate, dateType, contractStatus,contractCompany, contractor, insuredPerson, responsibleName, policyNumber, user]);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const {
        startDate, endDate, dateType, contractStatus, contractCompany,
        contractor, insuredPerson, responsibleName, policyNumber,
        selectedYear, selectedMonth, currentPage,
      } = location.state;
  
      setStartDate(startDate);
      setEndDate(endDate);
      setDateType(dateType);
      setContractStatus(contractStatus);
      setContractCompany(contractCompany);
      setContractor(contractor);
      setInsuredPerson(insuredPerson);
      setResponsibleName(responsibleName);
      setPolicyNumber(policyNumber);
      setSelectedYear(selectedYear);
      setSelectedMonth(selectedMonth);
  
      // 중요: fetchData는 상태가 세팅된 다음 실행되어야 하므로 setTimeout 사용
      setTimeout(() => {
        fetchData(currentPage || 1);
      }, 0);
    } else {
      fetchData(1);
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
    navigate('/long/new');
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    fetchData(pageNumber);
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
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
                      : contractStatus === 'statusFinished'
                      ? '완납'
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
                  <Dropdown.Item eventKey="statusFinished">완납</Dropdown.Item>
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
            <Col xs={12} md={1}>
              <Form.Group controlId="formContractor">
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
                  value={responsibleName}
                  onChange={(e) => setResponsibleName(e.target.value)}
                  className={styles.form_control_custom}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md="auto">
              <Form.Group controlId="formDateRange">
                <Form.Label>날짜 범위 : (시작, 끝이 오늘날짜일 경우 ➡️ 전체로 조회)</Form.Label>
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
                <DownloadButton modelName="long" startDate={startDate} endDate={endDate} dateType={dateType} responsibleName={responsibleName}/>
              </Col>
            )}
          </div>
        </Form>
        <div>
          <span>
            [ 납입보험료 합계 : {paymentInsurance ? new Intl.NumberFormat().format(paymentInsurance) : 0}원 ] 
            [ 수정보험료 합계 : {correctedInsurance ? new Intl.NumberFormat().format(correctedInsurance) : 0}원 ] 
            [ 총 {totalItems}건 ]
          </span>
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
                  <th className={styles.name}>담당</th>
                  <th>납입보</th>
                  <th>수정보</th>
                  <th className={styles.name}>납입</th>
                  <th className={styles.name}>상태</th>
                  <th>회차</th>
                  <th className={styles.name}>업무</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.contractDate}</td>
                    <td>{item.paymentStartDate}</td>
                    <td>{item.paymentEndDate}</td>
                    <td>{item.contractCompany}</td>
                    <td>{item.longTermProduct}</td>
                    <td>{item.birthdate_gender}</td>
                    <td>{item.insuredPerson}</td>
                    <td>
                      <Link
                        to={`/long/${item.id}`}
                        state={{
                          startDate,
                          endDate,
                          dateType,
                          contractStatus,
                          contractCompany,
                          contractor,
                          insuredPerson,
                          responsibleName,
                          policyNumber,
                          selectedYear,
                          selectedMonth,
                          currentPage
                        }}
                      >
                        {item.contractor}
                      </Link>
                    </td>
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
              <Pagination.Next onClick={() => handlePageChange(currentPage < Math.ceil(totalItems / itemsPerPage) ? currentPage + 1 : Math.ceil(data.length / itemsPerPage))} />
              <Pagination.Last onClick={() => handlePageChange(Math.ceil(totalItems / itemsPerPage))} />
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
