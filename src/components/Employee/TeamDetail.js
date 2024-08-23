import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';
import styles from '../../css/Detail.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const TeamDetail = () => {
  const { branchName, teamName } = useParams(); // URL 파라미터에서 지점 및 팀 이름을 가져옴
  const [employeeData, setEmployeeData] = useState([]); // 직원 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // API 요청을 통해 직원 데이터를 가져옴
        const response = await axios.get(`${API_URL}/user/name`, {
          params: { branch: branchName, team: teamName }
        });
        setEmployeeData(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        setError("직원 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지를 상태에 저장
        console.error("Error fetching employee data:", error); // 콘솔에 에러 로그 출력
      } finally {
        setLoading(false); // 데이터 로딩 상태를 false로 설정
      }
    };

    fetchEmployeeData();
  }, [branchName, teamName]); // branchName과 teamName이 변경될 때마다 데이터를 다시 가져옴

  return (
    <div>
      <Navigation /> {/* 네비게이션 컴포넌트 */}
      <Container>
        <Row>
          <Col>
            <h4><Link to={`/employee`}>인스빌</Link> ➡️ <Link to={`/employee/${branchName}`}>{branchName}</Link> 지점 ➡️ {teamName} 팀</h4>
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
              // 데이터 로딩이 완료되고 에러가 없을 때 직원 목록 표시
              <Table bordered className={styles.table_custom}>
                <thead>
                  <tr>
                    <th>이름</th>
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
                  {employeeData.length > 0 ? (
                    // 직원 데이터가 있을 경우 테이블에 데이터 표시
                    employeeData.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.manager}</td>
                        <td><Link to={`/employee/${branchName}/${teamName}/${employee.username}`}>{employee.username}</Link></td>
                        <td>{employee.birthdateGender}</td>
                        <td>{employee.mobilePhone}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.fax}</td>
                        <td>{employee.carSettlement}</td>
                        <td>{employee.longTermSettlement}</td>
                        <td>{employee.lifeSettlement}</td>
                      </tr>
                    ))
                  ) : (
                    // 직원 데이터가 없을 경우 '직원 정보가 없습니다' 메시지 표시
                    <tr>
                      <td colSpan="9" className="text-center">직원 정보가 없습니다.</td>
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

export default TeamDetail;
