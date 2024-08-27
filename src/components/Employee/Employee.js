import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Form } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';
import styles from '../../css/Effect.module.css'; // 모듈 import
import { Link, useNavigate } from 'react-router-dom'; // Update import
import axios from 'axios';
import DownloadButton from '../Long/DownloadBtn';

const API_URL = process.env.REACT_APP_API_URL;

const Employee = () => {
  const navigate = useNavigate(); 

  const [branchData, setBranchData] = useState([]);
  const [managerData, setManagerData] = useState([]); // 업무담당 데이터 상태 추가
  const [managerName, setManagerName] = useState('');
  const [searchData, setSearchData] = useState([]); // 업무담당 이름 상태 추가

  // 지점별 데이터 가져오기
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/branch`);
        setBranchData(response.data);
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    // 업무담당 데이터 가져오기
    const fetchManagerData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/manager`);
        setManagerData(response.data);
      } catch (error) {
        console.error("Error fetching manager data:", error);
      }
    };

    fetchBranchData();
    fetchManagerData();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.
    try {
      const response = await axios.post(`${API_URL}/user/list`, {
        managerName
      });
      setSearchData(response.data);
    } catch (error) {
      console.error("Error searching managers:", error);
    }
  };

  const handleCreateNew = () => {
    navigate('/employee/new');
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <h4>인스빌</h4>
          </Col>
          <Col xs={12} md="auto">
            <Button onClick={handleCreateNew}>작성</Button>
          </Col>
          <Col xs={12} md="auto">
            <DownloadButton modelName="user"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered striped className={styles.table_custom}>
              <thead>
                <tr>
                  <th>지점</th>
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
                {Object.keys(branchData).map((branch) => (
                  branchData[branch].map((user, index) => (
                    <tr key={`${branch}-${index}`}>
                      <td><Link to={`/employee/${branch}`}>{branch}</Link></td>
                      <td><Link to={`/employee/${branch}/''/${user.username}`}>{user.username}</Link></td>
                      <td>{user.birthdateGender}</td>
                      <td>{user.mobilePhone}</td>
                      <td>{user.phone}</td>
                      <td>{user.fax}</td>
                      <td>{user.carSettlement}</td>
                      <td>{user.longTermSettlement}</td>
                      <td>{user.lifeSettlement}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* 업무담당 테이블 추가 */}
        <Row>
          <Col>
            <Table bordered striped className={styles.table_custom}>
              <thead>
                <tr>
                  <th>업무담당</th>
                  <th>아이디</th>
                  <th>생년월일 / 성별</th>
                  <th>핸드폰</th>
                  <th>전화</th>
                  <th>팩스</th>
                </tr>
              </thead>
              <tbody>
                {managerData.map((user, index) => (
                  <tr key={`manager-${index}`}>
                    <td>{user.name}</td>
                    <td><Link to={`/employee/${user.branch}/${user.team}/${user.username}`}>{user.username}</Link></td>
                    <td>{user.birthdateGender}</td>
                    <td>{user.mobilePhone}</td>
                    <td>{user.phone}</td>
                    <td>{user.fax}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>사용자 검색</h4>
            <Form onSubmit={handleSearch}> {/* onSubmit 이벤트 핸들러 추가 */}
              <Row>
                <Col xs={12} md="auto">
                  <Form.Label>이름</Form.Label>
                </Col>
                <Col xs={12} md="auto">
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      name="이름"
                      placeholder="이름 입력 후 엔터"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">검색</Button> {/* 버튼 타입을 submit으로 변경 */}
                </Col>
              </Row>
            </Form>
            <Table bordered striped className={styles.table_custom}>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>아이디</th>
                  <th>지점</th>
                  <th>팀</th>
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
                {managerName && (
                  searchData.map((user, index) => {
                    // 경로를 동적으로 생성하며, 값이 없는 경우 경로에서 생략
                    const linkPath = `/employee${
                      user.branch ? `/${user.branch}` : '/undefined'
                    }${user.team ? `/${user.team}` : '/undefined'}/${user.username}`;

                    return (
                      <tr key={`search-${index}`}>
                        <td>{user.manager}</td>
                        <td><Link to={linkPath}>{user.username}</Link></td>
                        <td>{user.branch}</td>
                        <td>{user.team}</td>
                        <td>{user.birthdateGender}</td>
                        <td>{user.mobilePhone}</td>
                        <td>{user.phone}</td>
                        <td>{user.fax}</td>
                        <td>{user.carSettlement}</td>
                        <td>{user.longTermSettlement}</td>
                        <td>{user.lifeSettlement}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employee;
