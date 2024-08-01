import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Employee.module.css'; // 모듈 import
import { Link } from 'react-router-dom'; // Update import
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Employee = () => {
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/branch`);
        setBranchData(response.data);
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchBranchData();
  }, []);

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <Table bordered className={styles.table_custom}>
              <thead>
                <tr>
                  <th>지점(7개)</th>
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
                {branchData.map((branch, index) => (
                  <tr key={index}>
                    <td><Link to="#">{branch.branch}</Link></td>
                    <td><Link to="#">{branch.userCode}</Link></td>
                    <td>{branch.birthdateGender}</td>
                    <td>{branch.mobilePhone}</td>
                    <td>{branch.phone}</td>
                    <td>{branch.fax}</td>
                    <td>{branch.carSettlement}</td>
                    <td>{branch.longTermSettlement}</td>
                    <td>{branch.lifeSettlement}</td>
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
