import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';
import styles from '../../css/Detail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const CustomerDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 사용자 이름을 가져옴
  const [normalData, setNormalData] = useState(null); // 사용자 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchnormalData = async () => {
      try {
        // API 요청을 통해 사용자 데이터를 가져옴
        const response = await axios.post(`${API_URL}/normal/detail`, { id });
        setNormalData(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        setError("사용자 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching user data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };

    fetchnormalData();
  }, [id]); // id이 변경될 때마다 데이터를 다시 가져옴

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
                  {normalData ? (
                    // 사용자 데이터가 있을 경우 테이블에 데이터 표시
                    <>
                      <tr>
                        <td>이름</td>
                        <td>{normalData.manager}</td>
                      </tr>
                      <tr>
                        <td>지점</td>
                        <td>{normalData.branch}</td>
                      </tr>
                      <tr>
                        <td>팀</td>
                        <td>{normalData.team}</td>
                      </tr>
                      <tr>
                        <td>담당자 ID</td>
                        <td>{normalData.managerName}</td>
                      </tr>
                      <tr>
                        <td>유저 ID</td>
                        <td>{normalData.userId}</td>
                      </tr>
                      <tr>
                        <td>실제 사용자</td>
                        <td>{normalData.realUser}</td>
                      </tr>
                      <tr>
                        <td>계약 회사</td>
                        <td>{normalData.contractCompany}</td>
                      </tr>
                      <tr>
                        <td>장기 상품</td>
                        <td>{normalData.longTermProduct}</td>
                      </tr>
                      <tr>
                        <td>보험료</td>
                        <td>{normalData.insurancePremium}</td>
                      </tr>
                      <tr>
                        <td>수정된 보험료</td>
                        <td>{normalData.revisedPremium}</td>
                      </tr>
                      <tr>
                        <td>수정 비율</td>
                        <td>{normalData.revisionRate}</td>
                      </tr>
                      <tr>
                        <td>피보험자</td>
                        <td>{normalData.insuredPerson}</td>
                      </tr>
                      <tr>
                        <td>생년월일 및 성별</td>
                        <td>{normalData.birthdateGender}</td>
                      </tr>
                      <tr>
                        <td>보험 계약자</td>
                        <td>{normalData.policyholder}</td>
                      </tr>
                      <tr>
                        <td>보험 계약자 생년월일 및 성별</td>
                        <td>{normalData.policyholderBirthdateGender}</td>
                      </tr>
                      <tr>
                        <td>보험 계약 번호</td>
                        <td>{normalData.policyNumber}</td>
                      </tr>
                      <tr>
                        <td>디자인</td>
                        <td>{normalData.design}</td>
                      </tr>
                      <tr>
                        <td>상담 상태</td>
                        <td>{normalData.consultationStatus}</td>
                      </tr>
                      <tr>
                        <td>계약 상태</td>
                        <td>{normalData.contractStatus}</td>
                      </tr>
                      <tr>
                        <td>지급 시작일</td>
                        <td>{normalData.paymentStartDate}</td>
                      </tr>
                      <tr>
                        <td>지급 종료일</td>
                        <td>{normalData.paymentEndDate}</td>
                      </tr>
                      <tr>
                        <td>지급 기간</td>
                        <td>{normalData.paymentPeriod}</td>
                      </tr>
                      <tr>
                        <td>계약일</td>
                        <td>{normalData.contractDate}</td>
                      </tr>
                      <tr>
                        <td>지급일</td>
                        <td>{normalData.paymentDate}</td>
                      </tr>
                      <tr>
                        <td>보장 시작일</td>
                        <td>{normalData.coverageStartDate}</td>
                      </tr>
                      <tr>
                        <td>보장 종료일</td>
                        <td>{normalData.coverageEndDate}</td>
                      </tr>
                      <tr>
                        <td>상담 채널</td>
                        <td>{normalData.consultationChannel}</td>
                      </tr>
                      <tr>
                        <td>추가 정보 1</td>
                        <td>{normalData.additionalInfo1}</td>
                      </tr>
                      <tr>
                        <td>지불 방법</td>
                        <td>{normalData.paymentMethod}</td>
                      </tr>
                      <tr>
                        <td>지불 횟수</td>
                        <td>{normalData.paymentCount}</td>
                      </tr>
                      <tr>
                        <td>총 지불 금액</td>
                        <td>{normalData.totalPayments}</td>
                      </tr>
                      <tr>
                        <td>상담자</td>
                        <td>{normalData.consultant}</td>
                      </tr>
                      <tr>
                        <td>퍼센트</td>
                        <td>{normalData.percent}</td>
                      </tr>
                      <tr>
                        <td>사이버 머니</td>
                        <td>{normalData.CyberMoney}</td>
                      </tr>
                      <tr>
                        <td>선물</td>
                        <td>{normalData.gift}</td>
                      </tr>
                      <tr>
                        <td>보험 발송일</td>
                        <td>{normalData.policyDispatchDate}</td>
                      </tr>
                      <tr>
                        <td>서명일</td>
                        <td>{normalData.signatureDate}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 1</td>
                        <td>{normalData.changeContent1}</td>
                      </tr>
                      <tr>
                        <td>변경 날짜 1</td>
                        <td>{normalData.changeDate1}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 2</td>
                        <td>{normalData.changeContent2}</td>
                      </tr>
                      <tr>
                        <td>변경 날짜 2</td>
                        <td>{normalData.changeDate2}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 3</td>
                        <td>{normalData.changeContent3}</td>
                      </tr>
                      <tr>
                        <td>변경 날짜 3</td>
                        <td>{normalData.changeDate3}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 4</td>
                        <td>{normalData.changeContent4}</td>
                      </tr>
                      <tr>
                        <td>변경 날짜 4</td>
                        <td>{normalData.changeDate4}</td>
                      </tr>
                      <tr>
                        <td>변경 내용 5</td>
                        <td>{normalData.changeContent5}</td>
                      </tr>
                      <tr>
                        <td>변경 날짜 5</td>
                        <td>{normalData.changeDate5}</td>
                      </tr>
                      <tr>
                        <td>피보험자 우편번호</td>
                        <td>{normalData.insuredPersonZipcode}</td>
                      </tr>
                      <tr>
                        <td>피보험자 주소 1</td>
                        <td>{normalData.insuredPersonAddress1}</td>
                      </tr>
                      <tr>
                        <td>피보험자 주소 2</td>
                        <td>{normalData.insuredPersonAddress2}</td>
                      </tr>
                      <tr>
                        <td>보험 계약자 우편번호</td>
                        <td>{normalData.policyholderZipcode}</td>
                      </tr>
                      <tr>
                        <td>보험 계약자 주소 1</td>
                        <td>{normalData.policyholderAddress1}</td>
                      </tr>
                      <tr>
                        <td>보험 계약자 주소 2</td>
                        <td>{normalData.policyholderAddress2}</td>
                      </tr>
                      <tr>
                        <td>피보험자와의 관계</td>
                        <td>{normalData.relationToInsured}</td>
                      </tr>
                      <tr>
                        <td>직업</td>
                        <td>{normalData.occupation}</td>
                      </tr>
                      <tr>
                        <td>가입일</td>
                        <td>{normalData.entryDate}</td>
                      </tr>
                      <tr>
                        <td>고객 상담 내용</td>
                        <td>{normalData.customerConsultationContent}</td>
                      </tr>
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
