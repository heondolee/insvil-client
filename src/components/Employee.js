import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import styles from './css/Employee.module.css'; // 모듈 import
import { Link } from 'react-router-dom'; // Update import

const Employee = () => {
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
                  <th>메일</th>
                  <th>승인권한</th>
                  <th>로그인</th>
                  <th>자동차정산</th>
                  <th>장기정산</th>
                  <th>생명정산</th>
                  <th>일반정산</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Link to="#">본점영업1부</Link></td>
                  <td><Link to="#">i1001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td>051-646-9191</td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td><Link to="#">본점영업2부</Link></td>
                  <td><Link to="#">i2001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td>051-646-9191</td>
                  <td></td>
                  <td></td>
                  <td>O</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td><Link to="#">지점영업1부</Link></td>
                  <td><Link to="#">800001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td>051-646-3339</td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td>X</td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td><Link to="#">본관관리팀</Link></td>
                  <td><Link to="#">i4001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td>051-646-9191</td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td><Link to="#">지점영업7부</Link></td>
                  <td><Link to="#">700001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td>051-646-3339</td>
                  <td>051-646-9178</td>
                  <td></td>
                  <td>O</td>
                  <td>X</td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td><Link to="#">지점영업3부</Link></td>
                  <td><Link to="#">i9001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td><Link to="#">본점영업4부</Link></td>
                  <td><Link to="#">i6001</Link></td>
                  <td>121205 / 여</td>
                  <td></td>
                  <td>051-646-9191</td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                </tr>
              </tbody>
            </Table>

            <Table bordered className={styles.table_custom}>
              <thead>
                <tr>
                  <th>업무담당</th>
                  <th>아이디</th>
                  <th>생년월일 / 성별</th>
                  <th>핸드폰</th>
                  <th>전화</th>
                  <th>팩스</th>
                  <th>메일</th>
                  <th>승인권한</th>
                  <th>대수료관리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>강호빈</td>
                  <td><Link to="#">i3003</Link></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                </tr>
                <tr>
                  <td>김광한</td>
                  <td><Link to="#">i3004</Link></td>
                  <td>770712 / 여</td>
                  <td>010-6676-9173</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                </tr>
                <tr>
                  <td>이금란</td>
                  <td><Link to="#">i3002</Link></td>
                  <td>680915 / 여</td>
                  <td></td>
                  <td>051-646-3339</td>
                  <td></td>
                  <td></td>
                  <td>O</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td>이도원</td>
                  <td><Link to="#">i3009</Link></td>
                  <td>710215 / 남</td>
                  <td>010-7207-5915</td>
                  <td>051-646-9191</td>
                  <td>051-646-9176</td>
                  <td><a href="mailto:dowon127@nate.com">dowon127@nate.com</a></td>
                  <td>O</td>
                  <td>O</td>
                </tr>
                <tr>
                  <td>이원천</td>
                  <td><Link to="#">i3008</Link></td>
                  <td>550425 / 남</td>
                  <td>010-5247-9830</td>
                  <td>051-646-9191</td>
                  <td>051-646-9176</td>
                  <td><a href="mailto:insvil@hanmail.net">insvil@hanmail.net</a></td>
                  <td>O</td>
                  <td>O</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employee;
