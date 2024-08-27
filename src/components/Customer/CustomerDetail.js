import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerName: '',
    branch: '',
    team: '',
    responsibleId: '',
    responsibleName: '',
    birthdate: '',
    gender: '',
    mobilePhone: '',
    phone: '',
    postalCode: '',
    homeAddress1: '',
    homeAddress2: '',
    companyName: '',
    position: '',
    companyPhone: '',
    companyPostalCode: '',
    companyAddress1: '',
    companyAddress2: '',
    fax: '',
    email: '',
    bank: '',
    accountHolder: '',
    accountNumber: '',
    memo: '',
    registrationDate: '',
    familyName1: '',
    relationship1: '',
    familyBirthdate1: '',
    gender1: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      const fetchCustomerData = async () => {
        try {
          const response = await axios.post(`${API_URL}/customer/detail`, { id });
          setCustomerData(response.data);
        } catch (error) {
          setError("사용자 데이터를 가져오는 중 오류가 발생했습니다.");
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCustomerData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!customerData.customerName || customerData.customerName.trim() === "") {
        alert("이름을 입력하세요.");
        return; // 이름이 입력되지 않으면 저장 작업을 중지
      }
  
      const endpoint = id === undefined ? '/customer/create' : '/customer/update';
      await axios.post(`${API_URL}${endpoint}`, customerData);
      navigate('/customer');
      alert("사용자 데이터가 저장되었습니다.");
    } catch (error) {
      setError("사용자 데이터를 저장하는 중 오류가 발생했습니다.");
      console.error("Error saving user data:", error);
    }
  };
  

  const handleCancel = () => {
    navigate('/customer');
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        await axios.delete(`${API_URL}/customer/delete`, {
          data: { id: customerData.id },
        });
        navigate('/customer');
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
                <Form.Group as={Row} controlId="formCustomerName">
                  <Form.Label column sm={4}>이름</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="customerName"
                      value={customerData.customerName}
                      onChange={handleChange}
                      placeholder="이름을 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBranch">
                  <Form.Label column sm={4}>지점</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="branch"
                      value={customerData.branch}
                      onChange={handleChange}
                      placeholder="지점을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTeam">
                  <Form.Label column sm={4}>팀</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="team"
                      value={customerData.team}
                      onChange={handleChange}
                      placeholder="팀을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formResponsibleId">
                  <Form.Label column sm={4}>담당자 ID</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="responsibleId"
                      value={customerData.responsibleId}
                      onChange={handleChange}
                      placeholder="담당자 ID를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formResponsibleName">
                  <Form.Label column sm={4}>담당자 이름</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="responsibleName"
                      value={customerData.responsibleName}
                      onChange={handleChange}
                      placeholder="담당자 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBirthdate">
                  <Form.Label column sm={4}>생년월일</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="date"
                      name="birthdate"
                      value={customerData.birthdate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGender">
                  <Form.Label column sm={4}>성별</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={customerData.gender}
                      onChange={handleChange}
                    >
                      <option value="">선택하세요</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMobilePhone">
                  <Form.Label column sm={4}>휴대전화</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="mobilePhone"
                      value={customerData.mobilePhone}
                      onChange={handleChange}
                      placeholder="휴대전화 번호를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone">
                  <Form.Label column sm={4}>전화번호</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleChange}
                      placeholder="전화번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPostalCode">
                  <Form.Label column sm={4}>우편번호</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={customerData.postalCode}
                      onChange={handleChange}
                      placeholder="우편번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHomeAddress1">
                  <Form.Label column sm={4}>주소 1</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="homeAddress1"
                      value={customerData.homeAddress1}
                      onChange={handleChange}
                      placeholder="주소를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHomeAddress2">
                  <Form.Label column sm={4}>주소 2</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="homeAddress2"
                      value={customerData.homeAddress2}
                      onChange={handleChange}
                      placeholder="상세 주소를 입력하세요"
                      style={{ backgroundColor: '#fbff88' }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCompanyName">
                  <Form.Label column sm={4}>회사명</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={customerData.companyName}
                      onChange={handleChange}
                      placeholder="회사명을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPosition">
                  <Form.Label column sm={4}>직급</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="position"
                      value={customerData.position}
                      onChange={handleChange}
                      placeholder="직급을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCompanyPhone">
                  <Form.Label column sm={4}>회사 전화번호</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="companyPhone"
                      value={customerData.companyPhone}
                      onChange={handleChange}
                      placeholder="회사 전화번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCompanyPostalCode">
                  <Form.Label column sm={4}>회사 우편번호</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="companyPostalCode"
                      value={customerData.companyPostalCode}
                      onChange={handleChange}
                      placeholder="회사 우편번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCompanyAddress1">
                  <Form.Label column sm={4}>회사 주소 1</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="companyAddress1"
                      value={customerData.companyAddress1}
                      onChange={handleChange}
                      placeholder="회사 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCompanyAddress2">
                  <Form.Label column sm={4}>회사 주소 2</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="companyAddress2"
                      value={customerData.companyAddress2}
                      onChange={handleChange}
                      placeholder="상세 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                  저장
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="ml-2">
                  취소
                </Button>
                {id && (
                  <Button variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                    삭제
                  </Button>
                )}
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerDetail;
