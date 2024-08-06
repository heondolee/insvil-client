// import React, { useState, useCallback } from 'react';
// import { Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton, Button, Spinner, Pagination } from 'react-bootstrap';
// import Navigation from './layouts/Navigation'; // Navigation 컴포넌트 임포트
// import axios from 'axios';
// import styles from './css/Car.module.css'; // 모듈 import

// const API_URL = process.env.REACT_APP_API_URL;

// const Car = () => {
//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState(getCurrentDate());
//   const [endDate, setEndDate] = useState(getCurrentDate());
//   const [dateType, setDateType] = useState('contractDate');
//   const [contractStatus, setContractStatus] = useState('statusAll');
//   const [contractor, setContractor] = useState('');
//   const [carNumber, setcarNumber] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/car/date-range`, {
//         startDate,
//         endDate,
//         dateType,
//         contractStatus,
//         contractor,
//         carNumber
//       });
//       setData(response.data.cars);
//       setCurrentPage(1); // 새로운 데이터를 가져올 때 페이지를 첫 페이지로 초기화
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//     setIsLoading(false);
//   }, [startDate, endDate, dateType, contractStatus, contractor, carNumber]);

//   const formatNumber = (num) => {
//     if (!num.includes(',')) {
//       const formattedNum = new Intl.NumberFormat().format(num * 1000);
//       return formattedNum;
//     } else {
//       return num;
//     }
//   };

//   const formatTerm = (totalTerm) => {
//     return `0/${totalTerm}`;
//   };

//   // 현재 페이지에 맞는 데이터 슬라이싱
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   // 페이지 변경 핸들러
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPaginationItems = () => {
//     const totalPages = Math.ceil(data.length / itemsPerPage);
//     const maxPageNumbersToShow = 10;
//     const paginationItems = [];

//     let startPage = 1;
//     let endPage = totalPages;

//     if (totalPages > maxPageNumbersToShow) {
//       if (currentPage <= Math.ceil(maxPageNumbersToShow / 2)) {
//         endPage = maxPageNumbersToShow;
//       } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
//         startPage = totalPages - maxPageNumbersToShow + 1;
//       } else {
//         startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
//         endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
//       }
//     }

//     for (let number = startPage; number <= endPage; number++) {
//       paginationItems.push(
//         <Pagination.Item
//           key={number}
//           active={number === currentPage}
//           onClick={() => handlePageChange(number)}
//         >
//           {number}
//         </Pagination.Item>
//       );
//     }

//     if (startPage > 1) {
//       paginationItems.unshift(<Pagination.Ellipsis key="start-ellipsis" disabled />);
//     }

//     if (endPage < totalPages) {
//       paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
//     }

//     return paginationItems;
//   };

//   return (
//     <div>
//       <Navigation />
//       <Container>
//         <Form>
//           <Row className="align-items-center">
//             <Col xs={12} md="auto">
//               <Form.Group controlId="formDateType">
//                 <Form.Label>검색일 :</Form.Label>
//                 <DropdownButton
//                   variant="outline-secondary"
//                   title={
//                     dateType === 'contractDate' ? '계약일' : 
//                     dateType === 'paymentEndDate' ? '만기일' : 
//                     '개시일'
//                   }
//                   onSelect={(eventKey) => setDateType(eventKey)}
//                 >
//                   <Dropdown.Item eventKey="contractDate">계약일</Dropdown.Item>
//                   <Dropdown.Item eventKey="paymentStartDate">개시일</Dropdown.Item>
//                   <Dropdown.Item eventKey="paymentEndDate">만기일</Dropdown.Item>
//                 </DropdownButton>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md="auto">
//               <Form.Group controlId="formContractStatus">
//                 <Form.Label>계약상태 :</Form.Label>
//                 <DropdownButton
//                   variant="outline-secondary"
//                   title={
//                     contractStatus === 'statusAll'
//                       ? '전체'
//                       : contractStatus === 'statusMaintain'
//                       ? '유지'
//                       : contractStatus === 'statusLapse'
//                       ? '실효'
//                       : contractStatus === 'statusTerminate'
//                       ? '해지'
//                       : contractStatus === 'statusWithdraw'
//                       ? '철회'
//                       : contractStatus === 'statusCancel'
//                       ? '취소'
//                       : contractStatus === 'statusExpire'
//                       ? '만기'
//                       : '전체'
//                   }
//                   onSelect={(eventKey) => setContractStatus(eventKey)}
//                 >
//                   <Dropdown.Item eventKey="statusAll">전체</Dropdown.Item>
//                   <Dropdown.Item eventKey="statusMaintain">유지</Dropdown.Item>
//                   <Dropdown.Item eventKey="statusLapse">실효</Dropdown.Item>
//                   <Dropdown.Item eventKey="statusTerminate">해지</Dropdown.Item>
//                   <Dropdown.Item eventKey="statusWithdraw">철회</Dropdown.Item>
//                   <Dropdown.Item eventKey="statusCancel">취소</Dropdown.Item>
//                   <Dropdown.Item eventKey="statusExpire">만기</Dropdown.Item>
//                 </DropdownButton>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md="auto">
//               <Form.Group controlId="formContractor">
//                 <Form.Label>계약자 :</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder='계약자 이름:'
//                   value={contractor}
//                   onChange={(e) => setContractor(e.target.value)}
//                   className={styles.form_control_custom}
//                 />
//               </Form.Group>
//             </Col>
//             <Col xs={12} md="auto">
//               <Form.Group controlId="formcarNumber">
//                 <Form.Label>차량번호 :</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder='차량번호:'
//                   value={carNumber}
//                   onChange={(e) => setcarNumber(e.target.value)}
//                   className={styles.form_control_custom}
//                 />
//               </Form.Group>
//             </Col>
//             <Col xs={12} md="auto">
//               <Form.Group controlId="formDateRange">
//                 <Form.Label>날짜 범위 :</Form.Label>
//                 <InputGroup className={styles.input_group_custom}>
//                   <Form.Control
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                   <Form.Control
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md="auto">
//               <Button onClick={fetchData} className={styles.button_custom}>검색</Button>
//             </Col>
//           </Row>
//         </Form>
//         {isLoading ? (
//           <div className="text-center my-3">
//             <Spinner animation="border" role="status">
//               <span className="sr-only">로딩 중...</span>
//             </Spinner>
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <Table striped bordered hover className={styles.table_custom}>
//               <thead>
//                 <tr>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={index}>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             <Pagination>
//               <Pagination.First onClick={() => handlePageChange(1)} />
//               <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
//               {renderPaginationItems()}
//               <Pagination.Next onClick={() => handlePageChange(currentPage < Math.ceil(data.length / itemsPerPage) ? currentPage + 1 : Math.ceil(data.length / itemsPerPage))} />
//               <Pagination.Last onClick={() => handlePageChange(Math.ceil(data.length / itemsPerPage))} />
//             </Pagination>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default Car;
