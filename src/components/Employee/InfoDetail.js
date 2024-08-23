import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';
import styles from '../../css/Detail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const InfoDetail = () => {
  const { branchName, teamName, userName  } = useParams(); // URL 파라미터에서 사용자 이름을 가져옴
  const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // API 요청을 통해 사용자 데이터를 가져옴
        const response = await axios.post(`${API_URL}/user/detail`, { userName });
        setUserData(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        setError("사용자 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching user data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };

    fetchUserData();
  }, [userName]); // username이 변경될 때마다 데이터를 다시 가져옴

  return (
    <div>
      <Navigation /> {/* 네비게이션 컴포넌트 */}
      <Container>
        <Row>
          <Col>
            <h4><Link to={`/employee`}>인스빌</Link> ➡️ <Link to={`/employee/${branchName}`}>{branchName}</Link> 지점 ➡️ <Link to={`/employee/${branchName}`}>{teamName}</Link> 팀</h4>
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
                  {userData ? (
                    // 사용자 데이터가 있을 경우 테이블에 데이터 표시
                    <>
                      <tr>
                        <td>아이디</td>
                        <td>{userData.username}</td>
                      </tr>
                      <tr>
                        <td>지점</td>
                        <td>{userData.branch}</td>
                      </tr>
                      <tr>
                        <td>팀</td>
                        <td>{userData.team}</td>
                      </tr>
                      <tr>
                        <td>이름</td>
                        <td>{userData.manager}</td>
                      </tr>
                      <tr>
                        <td>생년월일 / 성별</td>
                        <td>{userData.birthdateGender}</td>
                      </tr>
                      <tr>
                        <td>핸드폰</td>
                        <td>{userData.mobilePhone}</td>
                      </tr>
                      <tr>
                        <td>전화</td>
                        <td>{userData.phone}</td>
                      </tr>
                      <tr>
                        <td>팩스</td>
                        <td>{userData.fax}</td>
                      </tr>
                      <tr>
                        <td>은행명</td>
                        <td>{userData.bank}</td>
                      </tr>
                      <tr>
                        <td>계좌번호</td>
                        <td>{userData.accountNumber}</td>
                      </tr>
                      <tr>
                        <td>예금주</td>
                        <td>{userData.accountHolder}</td>
                      </tr>
                      <tr>
                        <td>주소</td>
                        <td>{userData.address}</td>
                      </tr>
                      <tr>
                        <td>자동차정산</td>
                        <td>{userData.carSettlement}</td>
                      </tr>
                      <tr>
                        <td>장기정산</td>
                        <td>{userData.longTermSettlement}</td>
                      </tr>
                      <tr>
                        <td>생명정산</td>
                        <td>{userData.lifeSettlement}</td>
                      </tr>
                      <tr>
                        <td>기타</td>
                        <td>{userData.other}</td>
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

export default InfoDetail;
