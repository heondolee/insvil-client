import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/CustomerDetail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const LongDetail = () => {
  const { longName } = useParams(); // URL 파라미터에서 longName을 가져옴
  const [longData, setLongData] = useState(null); // long 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchLongData = async () => {
      try {
        // API 요청을 통해 long 데이터를 가져옴
        const response = await axios.post(`${API_URL}/long/detail`, { longName });
        setLongData(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        setError("데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching long data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };

    fetchLongData();
  }, [longName]); // longName이 변경될 때마다 데이터를 다시 가져옴

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
              // 데이터 로딩이 완료되고 에러가 없을 때 long 상세 정보 표시
              <Table bordered className={styles.table_custom}>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {longData ? (
                    // long 데이터가 있을 경우 테이블에 데이터 표시
                    <>
                      <tr>
                        <td>지점</td>
                        <td>{longData.branch}</td>
                      </tr>
                      <tr>
                        <td>팀</td>
                        <td>{longData.team}</td>
                      </tr>
                      <tr>
                        <td>책임자</td>
                        <td>{longData.responsible}</td>
                      </tr>
                      <tr>
                        <td>책임자 이름</td>
                        <td>{longData.responsibleName}</td>
                      </tr>
                      <tr>
                        <td>사용자 ID</td>
                        <td>{longData.userId}</td>
                      </tr>
                      <tr>
                        <td>실제 사용자</td>
                        <td>{longData.realUser}</td>
                      </tr>
                      <tr>
                        <td>계약 회사</td>
                        <td>{longData.contractCompany}</td>
                      </tr>
                      <tr>
                        <td>장기 제품</td>
                        <td>{longData.longTermProduct}</td>
                      </tr>
                      <tr>
                        <td>제품 이름</td>
                        <td>{longData.productName}</td>
                      </tr>
                      <tr>
                        <td>보험료</td>
                        <td>{longData.paymentInsurance}</td>
                      </tr>
                      <tr>
                        <td>수정 보험료</td>
                        <td>{longData.correctedInsurance}</td>
                      </tr>
                      <tr>
                        <td>수정 비율</td>
                        <td>{longData.correctionRate}</td>
                      </tr>
                      <tr>
                        <td>피보험자</td>
                        <td>{longData.insuredPerson}</td>
                      </tr>
                      <tr>
                        <td>생년월일/성별</td>
                        <td>{longData.birthdate_gender}</td>
                      </tr>
                      <tr>
                        <td>계약자</td>
                        <td>{longData.contractor}</td>
                      </tr>
                      <tr>
                        <td>계약자 생년월일/성별</td>
                        <td>{longData.contractor_birthdate_gender}</td>
                      </tr>
                      <tr>
                        <td>정책 번호</td>
                        <td>{longData.policyNumber}</td>
                      </tr>
                      <tr>
                        <td>계획</td>
                        <td>{longData.plan}</td>
                      </tr>
                      <tr>
                        <td>상담 상태</td>
                        <td>{longData.counselingStatus}</td>
                      </tr>
                      <tr>
                        <td>계약 상태</td>
                        <td>{longData.contractStatus}</td>
                      </tr>
                      <tr>
                        <td>납입 시작일</td>
                        <td>{longData.paymentStartDate}</td>
                      </tr>
                      <tr>
                        <td>납입 종료일</td>
                        <td>{longData.paymentEndDate}</td>
                      </tr>
                      <tr>
                        <td>납입 기간</td>
                        <td>{longData.paymentPeriod}</td>
                      </tr>
                      <tr>
                        <td>계약일</td>
                        <td>{longData.contractDate}</td>
                      </tr>
                      <tr>
                        <td>납입일</td>
                        <td>{longData.paymentDate}</td>
                      </tr>
                      <tr>
                        <td>보장 시작일</td>
                        <td>{longData.coverageStartDate}</td>
                      </tr>
                      <tr>
                        <td>보장 종료일</td>
                        <td>{longData.coverageEndDate}</td>
                      </tr>
                      <tr>
                        <td>상담 경로</td>
                        <td>{longData.counselingRoute}</td>
                      </tr>
                      <tr>
                        <td>기타 1</td>
                        <td>{longData.other1}</td>
                      </tr>
                      <tr>
                        <td>납입 방법</td>
                        <td>{longData.paymentMethod}</td>
                      </tr>
                      <tr>
                        <td>납입 조건</td>
                        <td>{longData.paymentTerm}</td>
                      </tr>
                      <tr>
                        <td>총 기간</td>
                        <td>{longData.totalTerm}</td>
                      </tr>
                      <tr>
                        <td>상담원</td>
                        <td>{longData.counselor}</td>
                      </tr>
                      <tr>
                        <td>퍼센트</td>
                        <td>{longData.percent}</td>
                      </tr>
                      <tr>
                        <td>사이버 머니</td>
                        <td>{longData.cyberMoney}</td>
                      </tr>
                      <tr>
                        <td>선물</td>
                        <td>{longData.gift}</td>
                      </tr>
                      <tr>
                        <td>정책 발송일</td>
                        <td>{longData.policyDispatchDate}</td>
                      </tr>
                      <tr>
                        <td>자필 서명일</td>
                        <td>{longData.handwrittenSignatureDate}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 1</td>
                        <td>{longData.changeContent1}</td>
                      </tr>
                      <tr>
                        <td>변경일 1</td>
                        <td>{longData.changeDate1}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 2</td>
                        <td>{longData.changeContent2}</td>
                      </tr>
                      <tr>
                        <td>변경일 2</td>
                        <td>{longData.changeDate2}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 3</td>
                        <td>{longData.changeContent3}</td>
                      </tr>
                      <tr>
                        <td>변경일 3</td>
                        <td>{longData.changeDate3}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 4</td>
                        <td>{longData.changeContent4}</td>
                      </tr>
                      <tr>
                        <td>변경일 4</td>
                        <td>{longData.changeDate4}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 5</td>
                        <td>{longData.changeContent5}</td>
                      </tr>
                      <tr>
                        <td>변경일 5</td>
                        <td>{longData.changeDate5}</td>
                      </tr>
                      <tr>
                        <td>피보험자 우편번호</td>
                        <td>{longData.insuredPostalCode}</td>
                      </tr>
                      <tr>
                        <td>피보험자 주소 1</td>
                        <td>{longData.insuredAddress1}</td>
                      </tr>
                      <tr>
                        <td>피보험자 주소 2</td>
                        <td>{longData.insuredAddress2}</td>
                      </tr>
                      <tr>
                        <td>계약자 우편번호</td>
                        <td>{longData.contractorPostalCode}</td>
                      </tr>
                      <tr>
                        <td>계약자 주소 1</td>
                        <td>{longData.contractorAddress1}</td>
                      </tr>
                      <tr>
                        <td>계약자 주소 2</td>
                        <td>{longData.contractorAddress2}</td>
                      </tr>
                      <tr>
                        <td>피보험자와의 관계</td>
                        <td>{longData.relationshipWithInsured}</td>
                      </tr>
                      <tr>
                        <td>직업</td>
                        <td>{longData.occupation}</td>
                      </tr>
                      <tr>
                        <td>가입일</td>
                        <td>{longData.entryDate}</td>
                      </tr>
                      <tr>
                        <td>고객 상담 내용</td>
                        <td>{longData.customerCounselingContent}</td>
                      </tr>
                    </>
                  ) : (
                    // long 데이터가 없을 경우 '데이터가 없습니다' 메시지 표시
                    <tr>
                      <td colSpan="2" className="text-center">데이터가 없습니다.</td>
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

export default LongDetail;
