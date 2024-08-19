import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/CustomerDetail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const CustomerDetail = () => {
  const { customerName  } = useParams(); // URL 파라미터에서 사용자 이름을 가져옴
  const [customerData, setCustomerData] = useState(null); // 사용자 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // API 요청을 통해 사용자 데이터를 가져옴
        const response = await axios.post(`${API_URL}/customer/detail`, { customerName });
        setCustomerData(response.data); // 가져온 데이터를 상태에 저장
        console.log(response.data);
      } catch (error) {
        setError("사용자 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching user data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };

    fetchCustomerData();
  }, [customerName]); // customerName이 변경될 때마다 데이터를 다시 가져옴

  return (
    <div>
      <Navigation /> {/* 네비게이션 컴포넌트 */}
      <Container>
        <Row>
          <Col>
            {loading ? (
              // 데이터 로딩 중일 때 스피너 표시
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              // 에러가 발생했을 때 에러 메시지 표시
              <Alert variant="danger">{error}</Alert>
            ) : (
              // 데이터 로딩이 완료되고 에러가 없을 때 사용자 상세 정보 표시
              <Table bordered className={styles.table_custom}>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData ? (
                    // 사용자 데이터가 있을 경우 테이블에 데이터 표시
                    <>
                      <tr>
                        <td>이름</td>
                        <td>{customerData.customerName}</td>
                      </tr>
                      <tr>
                        <td>지점</td>
                        <td>{customerData.branch}</td>
                      </tr>
                      <tr>
                        <td>팀</td>
                        <td>{customerData.team}</td>
                      </tr>
                      <tr>
                        <td>담당자 ID</td>
                        <td>{customerData.responsibleId}</td>
                      </tr>
                      <tr>
                        <td>담당자 이름</td>
                        <td>{customerData.responsibleName}</td>
                      </tr>
                      <tr>
                        <td>생년월일</td>
                        <td>{customerData.birthdate}</td>
                      </tr>
                      <tr>
                        <td>성별</td>
                        <td>{customerData.gender}</td>
                      </tr>
                      <tr>
                        <td>휴대전화</td>
                        <td>{customerData.mobilePhone}</td>
                      </tr>
                      <tr>
                        <td>전화번호</td>
                        <td>{customerData.phone}</td>
                      </tr>
                      <tr>
                        <td>우편번호</td>
                        <td>{customerData.postalCode}</td>
                      </tr>
                      <tr>
                        <td>주소</td>
                        <td>{customerData.homeAddress1} {customerData.homeAddress2}</td>
                      </tr>
                      <tr>
                        <td>회사명</td>
                        <td>{customerData.companyName}</td>
                      </tr>
                      <tr>
                        <td>직급</td>
                        <td>{customerData.position}</td>
                      </tr>
                      <tr>
                        <td>회사 전화번호</td>
                        <td>{customerData.companyPhone}</td>
                      </tr>
                      <tr>
                        <td>회사 우편번호</td>
                        <td>{customerData.companyPostalCode}</td>
                      </tr>
                      <tr>
                        <td>회사 주소</td>
                        <td>{customerData.companyAddress1} {customerData.companyAddress2}</td>
                      </tr>
                      <tr>
                        <td>팩스</td>
                        <td>{customerData.fax}</td>
                      </tr>
                      <tr>
                        <td>이메일</td>
                        <td>{customerData.email}</td>
                      </tr>
                      <tr>
                        <td>은행</td>
                        <td>{customerData.bank}</td>
                      </tr>
                      <tr>
                        <td>계좌명</td>
                        <td>{customerData.accountHolder}</td>
                      </tr>
                      <tr>
                        <td>계좌번호</td>
                        <td>{customerData.accountNumber}</td>
                      </tr>
                      <tr>
                        <td>메모</td>
                        <td>{customerData.memo}</td>
                      </tr>
                      <tr>
                        <td>등록일</td>
                        <td>{customerData.registrationDate}</td>
                      </tr>
                      {[...Array(6).keys()].map(i => (
                        <>
                          <tr key={`familyName${i + 1}`}>
                            <td>가족 이름 {i + 1}</td>
                            <td>{customerData[`familyName${i + 1}`]}</td>
                          </tr>
                          <tr key={`relationship${i + 1}`}>
                            <td>가족 관계 {i + 1}</td>
                            <td>{customerData[`relationship${i + 1}`]}</td>
                          </tr>
                          <tr key={`familyBirthdate${i + 1}`}>
                            <td>가족 생년월일 {i + 1}</td>
                            <td>{customerData[`familyBirthdate${i + 1}`]}</td>
                          </tr>
                          <tr key={`gender${i + 1}`}>
                            <td>가족 성별 {i + 1}</td>
                            <td>{customerData[`gender${i + 1}`]}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  ) : (
                    // 사용자 데이터가 없을 경우 '사용자 정보가 없습니다' 메시지 표시
                    <tr>
                      <td colSpan="2" className="text-center">사용자 정보가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerDetail;
