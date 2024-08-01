import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Update import
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/BranchDetail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const BranchDetail = () => {
  const { branchName } = useParams(); // URL 파라미터에서 지점 이름을 가져옴
  const [teamData, setTeamData] = useState([]); // 팀 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // API 요청을 통해 팀 데이터를 가져옴
        const response = await axios.get(`${API_URL}/user/team`, {
          params: { branch: branchName }
        });
        setTeamData(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        setError("팀 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching team data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };

    fetchTeamData();
  }, [branchName]); // branchName이 변경될 때마다 데이터를 다시 가져옴

  return (
    <div>
      <Navigation /> {/* 네비게이션 컴포넌트 */}
      <Container>
        <Row>
          <Col>
            <h4>{branchName} 지점의 팀 목록</h4>
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
              // 데이터 로딩이 완료되고 에러가 없을 때 팀 목록 표시
              <Table bordered className={styles.table_custom}>
                <thead>
                  <tr>
                    <th>팀</th>
                    <th>아이디</th>
                    <th>생년월일 / 성별</th>
                    <th>핸드폰</th>
                    <th>전화</th>
                    <th>팩스</th>
                    <th>자동차정산</th>
                    <th>장기정산</th>
                    <th>생명정산</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.length > 0 ? (
                    // 팀 데이터가 있을 경우 테이블에 데이터 표시
                    teamData.map((team, index) => (
                      <tr key={index}>
                        <td><Link to={`/employee/${branchName}/${team.team}`}>{team.team}</Link></td>
                        <td><Link to="#">{team.username}</Link></td>
                        <td><Link to="#">{team.birthdateGender}</Link></td>
                        <td>{team.mobilePhone}</td>
                        <td>{team.phone}</td>
                        <td>{team.fax}</td>
                        <td>{team.carSettlement}</td>
                        <td>{team.longTermSettlement}</td>
                        <td>{team.lifeSettlement}</td>
                      </tr>
                    ))
                  ) : (
                    // 팀 데이터가 없을 경우 '팀 정보가 없습니다' 메시지 표시
                    <tr>
                      <td colSpan="9" className="text-center">팀 정보가 없습니다.</td>
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

export default BranchDetail;
