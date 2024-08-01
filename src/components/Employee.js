import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Employee.module.css'; // 모듈 import
import { Link } from 'react-router-dom'; // Update import
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Employee = () => {
  const [branchData, setBranchData] = useState([]);
  const [managerData, setManagerData] = useState([]); // 업무담당 데이터 상태 추가

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

  return (
    <div>
      <Navigation />
      <Container>
        <h4>인스빌</h4>
        <Row>
          <Col>
            <Table bordered className={styles.table_custom}>
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
                      <td><Link to="#">{user.username}</Link></td>
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
            <Table bordered className={styles.table_custom}>
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
                    <td>{user.username}</td>
                    <td><Link to="#">{user.birthdateGender}</Link></td>
                    <td>{user.mobilePhone}</td>
                    <td>{user.phone}</td>
                    <td>{user.fax}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employee;
