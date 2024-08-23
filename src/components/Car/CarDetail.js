import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';
import styles from '../../css/Detail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const CarDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옴
  const [carData, setCarData] = useState(null); // car 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // API 요청을 통해 car 데이터를 가져옴
        const response = await axios.post(`${API_URL}/car/detail`, { id });
        setCarData(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        setError("데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching car data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };
    fetchCarData();
  }, [id]); // id가 변경될 때마다 데이터를 다시 가져옴

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
              // 데이터 로딩이 완료되고 에러가 없을 때 car 상세 정보 표시
              <Table bordered className={styles.table_custom}>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {carData ? (
                    // car 데이터가 있을 경우 테이블에 데이터 표시
                    <>
                      <tr>
                        <td>지점</td>
                        <td>{carData.branch}</td>
                      </tr>
                      <tr>
                        <td>팀</td>
                        <td>{carData.team}</td>
                      </tr>
                      <tr>
                        <td>책임자</td>
                        <td>{carData.personInCharge}</td>
                      </tr>
                      <tr>
                        <td>책임자 이름</td>
                        <td>{carData.responsibilityName}</td>
                      </tr>
                      <tr>
                        <td>사용자 이름</td>
                        <td>{carData.userName}</td>
                      </tr>
                      <tr>
                        <td>사용자</td>
                        <td>{carData.user}</td>
                      </tr>
                      <tr>
                        <td>계약 회사</td>
                        <td>{carData.contractCompany}</td>
                      </tr>
                      <tr>
                        <td>대리점 코드</td>
                        <td>{carData.agencyCode}</td>
                      </tr>
                      <tr>
                        <td>대리점 이름</td>
                        <td>{carData.agencyName}</td>
                      </tr>
                      <tr>
                        <td>1년 보험료</td>
                        <td>{carData.oneYearPremium}</td>
                      </tr>
                      <tr>
                        <td>초기 보험료</td>
                        <td>{carData.firstPremium}</td>
                      </tr>
                      <tr>
                        <td>할부 보험료</td>
                        <td>{carData.installmentPremium}</td>
                      </tr>
                      <tr>
                        <td>피보험자</td>
                        <td>{carData.insured}</td>
                      </tr>
                      <tr>
                        <td>피보험자 생년월일/성별</td>
                        <td>{carData.insuredBirthGender}</td>
                      </tr>
                      <tr>
                        <td>계약자</td>
                        <td>{carData.contractor}</td>
                      </tr>
                      <tr>
                        <td>계약자 생년월일/성별</td>
                        <td>{carData.contractorBirthGender}</td>
                      </tr>
                      <tr>
                        <td>자동차 번호</td>
                        <td>{carData.carNumber}</td>
                      </tr>
                      <tr>
                        <td>설계</td>
                        <td>{carData.design}</td>
                      </tr>
                      <tr>
                        <td>상담 상태</td>
                        <td>{carData.consultingStatus}</td>
                      </tr>
                      <tr>
                        <td>계약 상태</td>
                        <td>{carData.contractStatus}</td>
                      </tr>
                      <tr>
                        <td>객체 분류</td>
                        <td>{carData.objectClassification}</td>
                      </tr>
                      <tr>
                        <td>시작일</td>
                        <td>{carData.startDate}</td>
                      </tr>
                      <tr>
                        <td>종료일</td>
                        <td>{carData.endDate}</td>
                      </tr>
                      <tr>
                        <td>수령일</td>
                        <td>{carData.receiptDate}</td>
                      </tr>
                      <tr>
                        <td>상담 경로</td>
                        <td>{carData.consultationPath}</td>
                      </tr>
                      <tr>
                        <td>기타 1</td>
                        <td>{carData.etc1}</td>
                      </tr>
                      <tr>
                        <td>납입 방법</td>
                        <td>{carData.paymentMethod}</td>
                      </tr>
                      <tr>
                        <td>상담원</td>
                        <td>{carData.consultant}</td>
                      </tr>
                      <tr>
                        <td>퍼센트</td>
                        <td>{carData.percentage}</td>
                      </tr>
                      <tr>
                        <td>사이버 머니</td>
                        <td>{carData.cyberMoney}</td>
                      </tr>
                      <tr>
                        <td>선물</td>
                        <td>{carData.gift}</td>
                      </tr>
                      <tr>
                        <td>설계 번호</td>
                        <td>{carData.designNumber}</td>
                      </tr>
                      <tr>
                        <td>보험 번호</td>
                        <td>{carData.insuranceNumber}</td>
                      </tr>
                      <tr>
                        <td>이전 계약 회사</td>
                        <td>{carData.previousContractCompany}</td>
                      </tr>
                      <tr>
                        <td>피보험자 우편번호</td>
                        <td>{carData.insuredPostalCode}</td>
                      </tr>
                      <tr>
                        <td>피보험자 주소 1</td>
                        <td>{carData.insuredAddress1}</td>
                      </tr>
                      <tr>
                        <td>피보험자 주소 2</td>
                        <td>{carData.insuredAddress2}</td>
                      </tr>
                      <tr>
                        <td>계약자 우편번호</td>
                        <td>{carData.contractorPostalCode}</td>
                      </tr>
                      <tr>
                        <td>계약자 주소 1</td>
                        <td>{carData.contractorAddress1}</td>
                      </tr>
                      <tr>
                        <td>계약자 주소 2</td>
                        <td>{carData.contractorAddress2}</td>
                      </tr>
                      <tr>
                        <td>피보험자와의 관계</td>
                        <td>{carData.relationshipWithInsured}</td>
                      </tr>
                      <tr>
                        <td>지정된 사람과의 관계</td>
                        <td>{carData.relationshipWithSpecifiedPerson}</td>
                      </tr>
                      <tr>
                        <td>지정된 사람 이름</td>
                        <td>{carData.specifiedPersonName}</td>
                      </tr>
                      <tr>
                        <td>최소 운전자 이름</td>
                        <td>{carData.minDriverName}</td>
                      </tr>
                      <tr>
                        <td>배우자 이름</td>
                        <td>{carData.spouseName}</td>
                      </tr>
                      <tr>
                        <td>보험 유형</td>
                        <td>{carData.insuranceType}</td>
                      </tr>
                      <tr>
                        <td>자동차 유형</td>
                        <td>{carData.carType}</td>
                      </tr>
                      <tr>
                        <td>주행거리 신청</td>
                        <td>{carData.mileageApplication}</td>
                      </tr>
                      <tr>
                        <td>연령 제한</td>
                        <td>{carData.ageRestriction}</td>
                      </tr>
                      <tr>
                        <td>운전자 제한</td>
                        <td>{carData.driverRestriction}</td>
                      </tr>
                      <tr>
                        <td>차 이름 코드</td>
                        <td>{carData.carNameCode}</td>
                      </tr>
                      <tr>
                        <td>연도</td>
                        <td>{carData.year}</td>
                      </tr>
                      <tr>
                        <td>차 이름</td>
                        <td>{carData.carName}</td>
                      </tr>
                      <tr>
                        <td>배기량</td>
                        <td>{carData.displacement}</td>
                      </tr>
                      <tr>
                        <td>특별 요율</td>
                        <td>{carData.specialRate}</td>
                      </tr>
                      <tr>
                        <td>부속품</td>
                        <td>{carData.accessories}</td>
                      </tr>
                      <tr>
                        <td>부속품 가격</td>
                        <td>{carData.accessoryPrice}</td>
                      </tr>
                      <tr>
                        <td>자동차 가치</td>
                        <td>{carData.carValue}</td>
                      </tr>
                      <tr>
                        <td>총 자동차</td>
                        <td>{carData.totalCar}</td>
                      </tr>
                      <tr>
                        <td>책임 1</td>
                        <td>{carData.liability1}</td>
                      </tr>
                      <tr>
                        <td>책임 2</td>
                        <td>{carData.liability2}</td>
                      </tr>
                      <tr>
                        <td>재산 피해</td>
                        <td>{carData.propertyDamage}</td>
                      </tr>
                      <tr>
                        <td>개인 상해</td>
                        <td>{carData.personalInjury}</td>
                      </tr>
                      <tr>
                        <td>보험 미가입 차량</td>
                        <td>{carData.uninsuredMotorist}</td>
                      </tr>
                      <tr>
                        <td>자기 손해</td>
                        <td>{carData.ownDamage}</td>
                      </tr>
                      <tr>
                        <td>긴급 출동</td>
                        <td>{carData.emergencyDispatch}</td>
                      </tr>
                      <tr>
                        <td>가입 경험</td>
                        <td>{carData.subscriptionExperience}</td>
                      </tr>
                      <tr>
                        <td>법적 위반</td>
                        <td>{carData.legalViolations}</td>
                      </tr>
                      <tr>
                        <td>할인/할증</td>
                        <td>{carData.discountSurcharge}</td>
                      </tr>
                      <tr>
                        <td>특별 할증 1</td>
                        <td>{carData.specialSurcharge1}</td>
                      </tr>
                      <tr>
                        <td>특별 할증 2</td>
                        <td>{carData.specialSurcharge2}</td>
                      </tr>
                      <tr>
                        <td>3년 사고율</td>
                        <td>{carData.threeYearAccidentRate}</td>
                      </tr>
                      <tr>
                        <td>1년 사고 점수</td>
                        <td>{carData.oneYearAccidentScore}</td>
                      </tr>
                      <tr>
                        <td>3년 사고 점수</td>
                        <td>{carData.threeYearAccidentScore}</td>
                      </tr>
                      <tr>
                        <td>자동차 가입 경험</td>
                        <td>{carData.carSubscriptionExperience}</td>
                      </tr>
                      <tr>
                        <td>다른 소유 차량</td>
                        <td>{carData.otherOwnedCars}</td>
                      </tr>
                      <tr>
                        <td>현재 주행거리</td>
                        <td>{carData.currentMileage}</td>
                      </tr>
                      <tr>
                        <td>연간 주행거리</td>
                        <td>{carData.annualMileage}</td>
                      </tr>
                      <tr>
                        <td>주행거리 할인</td>
                        <td>{carData.mileageDiscount}</td>
                      </tr>
                      <tr>
                        <td>입력일</td>
                        <td>{carData.inputDate}</td>
                      </tr>
                      <tr>
                        <td>고객 상담</td>
                        <td>{carData.customerConsultation}</td>
                      </tr>
                      <tr>
                        <td>사전 동의</td>
                        <td>{carData.preConsent}</td>
                      </tr>
                      <tr>
                        <td>동의 날짜</td>
                        <td>{carData.consentDate}</td>
                      </tr>
                      <tr>
                        <td>사전 동의 번호</td>
                        <td>{carData.preConsentNumber}</td>
                      </tr>
                    </>
                  ) : (
                    // car 데이터가 없을 경우 '데이터가 없습니다' 메시지 표시
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

export default CarDetail;
