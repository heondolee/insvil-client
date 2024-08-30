import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const InfoDetail = () => {
  const { branchName, teamName, userName } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    branch: '',
    team: '',
    manager: '',
    birthdateGender: '',
    mobilePhone: '',
    phone: '',
    fax: '',
    bank: '',
    accountNumber: '',
    accountHolder: '',
    address: '',
    carSettlement: '',
    longTermSettlement: '',
    lifeSettlement: '',
    other: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userName !== undefined) {
      const fetchUserData = async () => {
        try {
          const response = await axios.post(`${API_URL}/user/detail`, { userName });
          setUserData(response.data);
        } catch (error) {
          setError("사용자 데이터를 가져오는 중 오류가 발생했습니다.");
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!userData.username || userData.username.trim() === "") {
        alert("아이디를 입력하세요.");
        return;
      }
  
      const endpoint = userName === undefined ? '/user/create' : '/user/update';
      await axios.post(`${API_URL}${endpoint}`, userData);
      navigate('/employee');
      alert("사용자 데이터가 저장되었습니다.");
    } catch (error) {
      setError("사용자 데이터를 저장하는 중 오류가 발생했습니다.");
      console.error("Error saving user data:", error);
    }
  };

  const handleCancel = () => {
    navigate('/employee');
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        await axios.delete(`${API_URL}/user/delete`, {
          data: { id: userData.id },
        });
        navigate('/employee');
        alert("사용자 데이터가 삭제되었습니다.");
      }
    } catch (error) {
      setError("사용자 데이터를 삭제하는 중 오류가 발생했습니다.");
      console.error("Error deleting user data:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <h4>
              <Link to={`/employee`}>인스빌</Link> ➡️{' '}
              <Link to={`/employee/${branchName}`}>{branchName}</Link> 지점 ➡️{' '}
              <Link to={`/employee/${branchName}/${teamName}`}>{teamName}</Link> 팀
            </h4>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Form>
                <Form.Group as={Row} controlId="formUsername">
                  <Form.Label column sm={2}>아이디</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      placeholder="아이디를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBranch">
                  <Form.Label column sm={2}>지점</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="branch"
                      value={userData.branch}
                      onChange={handleChange}
                      placeholder="지점을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTeam">
                  <Form.Label column sm={2}>팀</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="team"
                      value={userData.team}
                      onChange={handleChange}
                      placeholder="팀을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formManager">
                  <Form.Label column sm={2}>이름</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="manager"
                      value={userData.manager}
                      onChange={handleChange}
                      placeholder="이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBirthdateGender">
                  <Form.Label column sm={2}>생년월일 / 성별</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="birthdateGender"
                      value={userData.birthdateGender}
                      onChange={handleChange}
                      placeholder="생년월일과 성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMobilePhone">
                  <Form.Label column sm={2}>핸드폰</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="mobilePhone"
                      value={userData.mobilePhone}
                      onChange={handleChange}
                      placeholder="핸드폰 번호를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone">
                  <Form.Label column sm={2}>전화</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="전화번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formFax">
                  <Form.Label column sm={2}>팩스</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="fax"
                      value={userData.fax}
                      onChange={handleChange}
                      placeholder="팩스 번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBank">
                  <Form.Label column sm={2}>은행명</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="bank"
                      value={userData.bank}
                      onChange={handleChange}
                      placeholder="은행명을 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAccountNumber">
                  <Form.Label column sm={2}>계좌번호</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="accountNumber"
                      value={userData.accountNumber}
                      onChange={handleChange}
                      placeholder="계좌번호를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAccountHolder">
                  <Form.Label column sm={2}>예금주</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="accountHolder"
                      value={userData.accountHolder}
                      onChange={handleChange}
                      placeholder="예금주를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAddress">
                  <Form.Label column sm={2}>주소</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      placeholder="주소를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarSettlement">
                  <Form.Label column sm={2}>자동차정산</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="carSettlement"
                      value={userData.carSettlement}
                      onChange={handleChange}
                      placeholder="자동차정산 정보를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLongTermSettlement">
                  <Form.Label column sm={2}>장기정산</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="longTermSettlement"
                      value={userData.longTermSettlement}
                      onChange={handleChange}
                      placeholder="장기정산 정보를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLifeSettlement">
                  <Form.Label column sm={2}>생명정산</Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="lifeSettlement"
                      value={userData.lifeSettlement}
                      onChange={handleChange}
                      placeholder="생명정산 정보를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                  저장
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="ml-2">
                  취소
                </Button>
                {userName && (
                  <Button variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                    삭제
                  </Button>
                )}
              </Form>
            )}
          </Col>
          <Col>
            <Form.Group as={Row} controlId="formOther">
              <Form.Label column sm={12}>기타(메모)</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="textarea"
                  rows={25}
                  name="other"
                  value={userData.other}
                  onChange={handleChange}
                  placeholder="기타 정보를 입력하세요"
                  style={{ backgroundColor: '#fbff88' }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoDetail;
