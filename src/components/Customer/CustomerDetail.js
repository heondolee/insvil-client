import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const CustomerDetail = () => {
  const { id } = useParams();  // URL에서 고객 ID를 가져옴
  const navigate = useNavigate();  // 페이지 이동을 위한 네비게이트 훅
  const [customerData, setCustomerData] = useState({
    customerName: '',  // 고객 이름
    branch: '',  // 지점
    team: '',  // 팀
    responsibleId: '',  // 담당자 ID
    responsibleName: '',  // 담당자 이름
    birthdate: '',  // 생년월일
    gender: '',  // 성별
    mobilePhone: '',  // 휴대전화
    phone: '',  // 전화번호
    postalCode: '',  // 우편번호
    homeAddress1: '',  // 주소 1
    homeAddress2: '',  // 주소 2
    companyName: '',  // 회사명
    position: '',  // 직급
    companyPhone: '',  // 회사 전화번호
    companyPostalCode: '',  // 회사 우편번호
    companyAddress1: '',  // 회사 주소 1
    companyAddress2: '',  // 회사 주소 2
    fax: '',  // 팩스
    email: '',  // 이메일
    bank: '',  // 은행명
    accountHolder: '',  // 계좌 예금주
    accountNumber: '',  // 계좌 번호
    memo: '',  // 메모
    registrationDate: '',  // 등록일
    familyName1: '',  // 가족 이름 1
    relationship1: '',  // 가족 관계 1
    familyBirthdate1: '',  // 가족 생년월일 1
    gender1: '',  // 가족 성별 1
  });

  const [loading, setLoading] = useState(true);  // 데이터 로딩 상태
  const [error, setError] = useState(null);  // 오류 상태

  useEffect(() => {
    if (id !== undefined) {  // id가 존재할 경우 고객 데이터 가져오기
      const fetchCustomerData = async () => {
        try {
          const response = await axios.post(`${API_URL}/customer/detail`, { id });
          setCustomerData(response.data);  // 데이터 설정
        } catch (error) {
          setError("사용자 데이터를 가져오는 중 오류가 발생했습니다.");  // 오류 메시지 설정
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);  // 로딩 완료
        }
      };
      fetchCustomerData();
    } else {
      setLoading(false);  // id가 없을 경우 로딩 완료
    }
  }, [id]);

  // 폼 입력값이 변경될 때마다 customerData 상태를 업데이트하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 데이터 저장 함수
  const handleSave = async () => {
    try {
      if (!customerData.customerName || customerData.customerName.trim() === "") {
        alert("이름을 입력하세요.");  // 이름이 입력되지 않은 경우 경고 메시지
        return;
      }
  
      const endpoint = id === undefined ? '/customer/create' : '/customer/update';  // id가 없는 경우 생성, 있는 경우 업데이트
      await axios.post(`${API_URL}${endpoint}`, customerData);  // 데이터 저장
      navigate('/customer');  // 저장 후 고객 리스트 페이지로 이동
      alert("사용자 데이터가 저장되었습니다.");
    } catch (error) {
      setError("사용자 데이터를 저장하는 중 오류가 발생했습니다.");  // 오류 메시지 설정
      console.error("Error saving user data:", error);
    }
  };

  // 취소 버튼 클릭 시 고객 리스트 페이지로 이동하는 함수
  const handleCancel = () => {
    navigate('/customer');
  };

  // 삭제 버튼 클릭 시 사용자 데이터를 삭제하는 함수
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");  // 삭제 확인
      if (confirmDelete) {
        await axios.delete(`${API_URL}/customer/delete`, {
          data: { id: customerData.id },
        });
        navigate('/customer');  // 삭제 후 고객 리스트 페이지로 이동
        alert("사용자 데이터가 삭제되었습니다.");
      }
    } catch (error) {
      setError("사용자 데이터를 삭제하는 중 오류가 발생했습니다.");  // 오류 메시지 설정
      console.error("Error deleting user data:", error);
    }
  };
  
  return (
    <div>
      <Navigation />  {/* 네비게이션 컴포넌트 */}
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
                {/* 이름 입력 필드 */}
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

                {/* 지점 입력 필드 */}
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

                {/* 팀 입력 필드 */}
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

                {/* 담당자 ID 입력 필드 */}
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

                {/* 담당자 이름 입력 필드 */}
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

                {/* 생년월일 입력 필드 */}
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

                {/* 성별 선택 필드 */}
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

                {/* 휴대전화 입력 필드 */}
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

                {/* 전화번호 입력 필드 */}
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

                {/* 우편번호 입력 필드 */}
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

                {/* 주소 1 입력 필드 */}
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

                {/* 주소 2 입력 필드 */}
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

                {/* 회사명 입력 필드 */}
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

                {/* 직급 입력 필드 */}
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

                {/* 회사 전화번호 입력 필드 */}
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

                {/* 회사 우편번호 입력 필드 */}
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

                {/* 회사 주소 1 입력 필드 */}
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

                {/* 회사 주소 2 입력 필드 */}
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

                {/* 저장 버튼 */}
                <Button variant="primary" onClick={handleSave}>
                  저장
                </Button>
                {/* 취소 버튼 */}
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
          <Col>
            {/* 팩스 입력 필드 */}
            <Form.Group as={Row} controlId="formFax">
              <Form.Label column sm={4}>팩스</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="fax"
                  value={customerData.fax}
                  onChange={handleChange}
                  placeholder="팩스 번호를 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 이메일 입력 필드 */}
            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={4}>이메일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  placeholder="이메일 주소를 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 은행명 입력 필드 */}
            <Form.Group as={Row} controlId="formBank">
              <Form.Label column sm={4}>은행명</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="bank"
                  value={customerData.bank}
                  onChange={handleChange}
                  placeholder="은행명을 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 계좌 예금주 입력 필드 */}
            <Form.Group as={Row} controlId="formAccountHolder">
              <Form.Label column sm={4}>계좌 예금주</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="accountHolder"
                  value={customerData.accountHolder}
                  onChange={handleChange}
                  placeholder="예금주 이름을 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 계좌 번호 입력 필드 */}
            <Form.Group as={Row} controlId="formAccountNumber">
              <Form.Label column sm={4}>계좌 번호</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="accountNumber"
                  value={customerData.accountNumber}
                  onChange={handleChange}
                  placeholder="계좌 번호를 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 등록일 입력 필드 */}
            <Form.Group as={Row} controlId="formRegistrationDate">
              <Form.Label column sm={4}>등록일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="registrationDate"
                  value={customerData.registrationDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* 가족 이름 1 입력 필드 */}
            <Form.Group as={Row} controlId="formFamilyName1">
              <Form.Label column sm={4}>가족 이름 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="familyName1"
                  value={customerData.familyName1}
                  onChange={handleChange}
                  placeholder="가족 이름을 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 가족 관계 1 입력 필드 */}
            <Form.Group as={Row} controlId="formRelationship1">
              <Form.Label column sm={4}>가족 관계 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="relationship1"
                  value={customerData.relationship1}
                  onChange={handleChange}
                  placeholder="가족 관계를 입력하세요"
                />
              </Col>
            </Form.Group>

            {/* 가족 생년월일 1 입력 필드 */}
            <Form.Group as={Row} controlId="formFamilyBirthdate1">
              <Form.Label column sm={4}>가족 생년월일 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="familyBirthdate1"
                  value={customerData.familyBirthdate1}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* 가족 성별 1 입력 필드 */}
            <Form.Group as={Row} controlId="formGender1">
              <Form.Label column sm={4}>가족 성별 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  name="gender1"
                  value={customerData.gender1}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col>
            {/* 메모 입력 필드 */}
            <Form.Group as={Row} controlId="formMemo">
              <Form.Label column sm={12}>메모</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="textarea"
                  name="memo"
                  rows={30}
                  value={customerData.memo}
                  onChange={handleChange}
                  placeholder="메모를 입력하세요"
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

export default CustomerDetail;
