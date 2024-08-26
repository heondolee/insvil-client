import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const LongDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [longData, setLongData] = useState({
    branch: '',
    team: '',
    responsible: '',
    responsibleName: '',
    userId: '',
    realUser: '',
    contractCompany: '',
    longTermProduct: '',
    productName: '',
    paymentInsurance: '',
    correctedInsurance: '',
    correctionRate: '',
    insuredPerson: '',
    birthdate_gender: '',
    contractor: '',
    contractor_birthdate_gender: '',
    policyNumber: '',
    plan: '',
    counselingStatus: '',
    contractStatus: '',
    paymentStartDate: '',
    paymentEndDate: '',
    paymentPeriod: '',
    contractDate: '',
    paymentDate: '',
    coverageStartDate: '',
    coverageEndDate: '',
    counselingRoute: '',
    other1: '',
    paymentMethod: '',
    paymentTerm: '',
    totalTerm: '',
    counselor: '',
    percent: '',
    cyberMoney: '',
    gift: '',
    policyDispatchDate: '',
    handwrittenSignatureDate: '',
    changeContent1: '',
    changeDate1: '',
    changeContent2: '',
    changeDate2: '',
    changeContent3: '',
    changeDate3: '',
    changeContent4: '',
    changeDate4: '',
    changeContent5: '',
    changeDate5: '',
    insuredPostalCode: '',
    insuredAddress1: '',
    insuredAddress2: '',
    contractorPostalCode: '',
    contractorAddress1: '',
    contractorAddress2: '',
    relationshipWithInsured: '',
    occupation: '',
    entryDate: '',
    customerCounselingContent: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (id !== undefined) { // 왜 id !== 'new'로 하면 안될까?
      const fetchLongData = async () => {
        try {
          const response = await axios.post(`${API_URL}/long/detail`, { id });
          setLongData(response.data);
        } catch (error) {
          setError("데이터를 가져오는 중 오류가 발생했습니다.");
          console.error("Error fetching long data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLongData();
    } else {
      setLongData((prevData) => ({
        ...prevData,
        contractDate: getCurrentDate(),
      }));
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLongData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!longData.contractor || longData.contractor.trim() === "") {
        alert("계약자를 입력하세요.");
        return;
      }

      if (!longData.contractDate) {
        alert("계약일을 입력하세요.");
        return;
      }

      if (!longData.paymentStartDate || longData.paymentStartDate.trim() === "") {
        alert("개시일을 입력하세요.");
        return;
      }

      if (!longData.paymentEndDate || longData.paymentEndDate.trim() === "") {
        alert("만기일을 입력하세요.");
        return;
      }
  
      const endpoint = id === undefined ? '/long/create' : '/long/update';
      await axios.post(`${API_URL}${endpoint}`, longData);
      navigate('/long');
      alert("데이터가 저장되었습니다.");
    } catch (error) {
      setError("데이터를 저장하는 중 오류가 발생했습니다.");
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    navigate('/long');
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        await axios.delete(`${API_URL}/long/delete`, {
          data: { id: longData.id },
        });
        navigate('/long');
        alert("데이터가 삭제되었습니다.");
      }
    } catch (error) {
      setError("데이터를 삭제하는 중 오류가 발생했습니다.");
      console.error("Error deleting data:", error);
    }
  };
  
  return (
    <div>
      <Navigation />
      <Container >
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
                <Form.Group as={Row} controlId="formBranch">
                  <Form.Label column sm={4}>지점</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="branch"
                      value={longData.branch}
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
                      value={longData.team}
                      onChange={handleChange}
                      placeholder="팀을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formResponsible">
                  <Form.Label column sm={4}>책임자</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="responsible"
                      value={longData.responsible}
                      onChange={handleChange}
                      placeholder="책임자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formResponsibleName">
                  <Form.Label column sm={4}>책임자 이름</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="responsibleName"
                      value={longData.responsibleName}
                      onChange={handleChange}
                      placeholder="책임자 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUserId">
                  <Form.Label column sm={4}>사용자 ID</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="userId"
                      value={longData.userId}
                      onChange={handleChange}
                      placeholder="사용자 ID를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRealUser">
                  <Form.Label column sm={4}>실제 사용자</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="realUser"
                      value={longData.realUser}
                      onChange={handleChange}
                      placeholder="실제 사용자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractCompany">
                  <Form.Label column sm={4}>계약 회사</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="contractCompany"
                      value={longData.contractCompany}
                      onChange={handleChange}
                      placeholder="계약 회사를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLongTermProduct">
                  <Form.Label column sm={4}>장기 제품</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="longTermProduct"
                      value={longData.longTermProduct}
                      onChange={handleChange}
                      placeholder="장기 제품을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formProductName">
                  <Form.Label column sm={4}>제품 이름</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="productName"
                      value={longData.productName}
                      onChange={handleChange}
                      placeholder="제품 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentInsurance">
                  <Form.Label column sm={4}>보험료</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="paymentInsurance"
                      value={longData.paymentInsurance}
                      onChange={handleChange}
                      placeholder="보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCorrectedInsurance">
                  <Form.Label column sm={4}>수정 보험료</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="correctedInsurance"
                      value={longData.correctedInsurance}
                      onChange={handleChange}
                      placeholder="수정 보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCorrectionRate">
                  <Form.Label column sm={4}>수정 비율</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="correctionRate"
                      value={longData.correctionRate}
                      onChange={handleChange}
                      placeholder="수정 비율을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredPerson">
                  <Form.Label column sm={4}>피보험자</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="insuredPerson"
                      value={longData.insuredPerson}
                      onChange={handleChange}
                      placeholder="피보험자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBirthdateGender">
                  <Form.Label column sm={4}>생년월일/성별</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="birthdate_gender"
                      value={longData.birthdate_gender}
                      onChange={handleChange}
                      placeholder="생년월일/성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractor">
                  <Form.Label column sm={4} style={{ color: 'blue' }}>계약자</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="contractor"
                      value={longData.contractor}
                      onChange={handleChange}
                      placeholder="계약자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractorBirthdateGender">
                  <Form.Label column sm={4}>계약자 생년월일/<br />성별</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="contractor_birthdate_gender"
                      value={longData.contractor_birthdate_gender}
                      onChange={handleChange}
                      placeholder="계약자 생년월일/성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyNumber">
                  <Form.Label column sm={4}>정책 번호</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="policyNumber"
                      value={longData.policyNumber}
                      onChange={handleChange}
                      placeholder="정책 번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlan">
                  <Form.Label column sm={4}>계획</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="plan"
                      value={longData.plan}
                      onChange={handleChange}
                      placeholder="계획을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCounselingStatus">
                  <Form.Label column sm={4}>상담 상태</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="counselingStatus"
                      value={longData.counselingStatus}
                      onChange={handleChange}
                      placeholder="상담 상태를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractStatus">
                  <Form.Label column sm={4}>계약 상태</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="contractStatus"
                      value={longData.contractStatus}
                      onChange={handleChange}
                      placeholder="계약 상태를 입력하세요"
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
          <Col>
            <Form.Group as={Row} controlId="formContractDate">
              <Form.Label column sm={4} style={{ color: 'blue' }}>계약일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="contractDate"
                  value={longData.contractDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPaymentStartDate">
              <Form.Label column sm={4} style={{ color: 'blue' }}>개시일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="paymentStartDate"
                  value={longData.paymentStartDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPaymentEndDate">
              <Form.Label column sm={4} style={{ color: 'blue' }}>만기일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="paymentEndDate"
                  value={longData.paymentEndDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPaymentPeriod">
              <Form.Label column sm={4}>납입 기간</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="paymentPeriod"
                  value={longData.paymentPeriod}
                  onChange={handleChange}
                  placeholder="납입 기간을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPaymentDate">
              <Form.Label column sm={4}>납입일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="paymentDate"
                  value={longData.paymentDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCoverageStartDate">
              <Form.Label column sm={4}>보장 시작일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="coverageStartDate"
                  value={longData.coverageStartDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCoverageEndDate">
              <Form.Label column sm={4}>보장 종료일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="coverageEndDate"
                  value={longData.coverageEndDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCounselingRoute">
              <Form.Label column sm={4}>상담 경로</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="counselingRoute"
                  value={longData.counselingRoute}
                  onChange={handleChange}
                  placeholder="상담 경로를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formOther1">
              <Form.Label column sm={4}>기타 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="other1"
                  value={longData.other1}
                  onChange={handleChange}
                  placeholder="기타 정보를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPaymentMethod">
              <Form.Label column sm={4}>납입 방법</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="paymentMethod"
                  value={longData.paymentMethod}
                  onChange={handleChange}
                  placeholder="납입 방법을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPaymentTerm">
              <Form.Label column sm={4}>납입 조건</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="paymentTerm"
                  value={longData.paymentTerm}
                  onChange={handleChange}
                  placeholder="납입 조건을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formTotalTerm">
              <Form.Label column sm={4}>총 기간</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="totalTerm"
                  value={longData.totalTerm}
                  onChange={handleChange}
                  placeholder="총 기간을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCounselor">
              <Form.Label column sm={4}>상담원</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="counselor"
                  value={longData.counselor}
                  onChange={handleChange}
                  placeholder="상담원을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPercent">
              <Form.Label column sm={4}>퍼센트</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="percent"
                  value={longData.percent}
                  onChange={handleChange}
                  placeholder="퍼센트를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCyberMoney">
              <Form.Label column sm={4}>사이버 머니</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="cyberMoney"
                  value={longData.cyberMoney}
                  onChange={handleChange}
                  placeholder="사이버 머니를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formGift">
              <Form.Label column sm={4}>선물</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="gift"
                  value={longData.gift}
                  onChange={handleChange}
                  placeholder="선물을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPolicyDispatchDate">
              <Form.Label column sm={4}>정책 발송일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="policyDispatchDate"
                  value={longData.policyDispatchDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHandwrittenSignatureDate">
              <Form.Label column sm={4}>자필 서명일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="handwrittenSignatureDate"
                  value={longData.handwrittenSignatureDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeContent1">
              <Form.Label column sm={4}>변경 내용 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="changeContent1"
                  value={longData.changeContent1}
                  onChange={handleChange}
                  placeholder="변경 내용을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeDate1">
              <Form.Label column sm={4}>변경일 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="changeDate1"
                  value={longData.changeDate1}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeContent2">
              <Form.Label column sm={4}>변경 내용 2</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="changeContent2"
                  value={longData.changeContent2}
                  onChange={handleChange}
                  placeholder="변경 내용을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeDate2">
              <Form.Label column sm={4}>변경일 2</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="changeDate2"
                  value={longData.changeDate2}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group as={Row} controlId="formChangeContent3">
              <Form.Label column sm={4}>변경 내용 3</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="changeContent3"
                  value={longData.changeContent3}
                  onChange={handleChange}
                  placeholder="변경 내용을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeDate3">
              <Form.Label column sm={4}>변경일 3</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="changeDate3"
                  value={longData.changeDate3}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeContent4">
              <Form.Label column sm={4}>변경 내용 4</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="changeContent4"
                  value={longData.changeContent4}
                  onChange={handleChange}
                  placeholder="변경 내용을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeDate4">
              <Form.Label column sm={4}>변경일 4</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="changeDate4"
                  value={longData.changeDate4}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeContent5">
              <Form.Label column sm={4}>변경 내용 5</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="changeContent5"
                  value={longData.changeContent5}
                  onChange={handleChange}
                  placeholder="변경 내용을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formChangeDate5">
              <Form.Label column sm={4}>변경일 5</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="changeDate5"
                  value={longData.changeDate5}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formInsuredPostalCode">
              <Form.Label column sm={4}>피보험자 우편번호</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="insuredPostalCode"
                  value={longData.insuredPostalCode}
                  onChange={handleChange}
                  placeholder="피보험자 우편번호를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formInsuredAddress1">
              <Form.Label column sm={4}>피보험자 주소 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="insuredAddress1"
                  value={longData.insuredAddress1}
                  onChange={handleChange}
                  placeholder="피보험자 주소를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formInsuredAddress2">
              <Form.Label column sm={4}>피보험자 주소 2</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="insuredAddress2"
                  value={longData.insuredAddress2}
                  onChange={handleChange}
                  placeholder="피보험자 상세 주소를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formContractorPostalCode">
              <Form.Label column sm={4}>계약자 우편번호</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="contractorPostalCode"
                  value={longData.contractorPostalCode}
                  onChange={handleChange}
                  placeholder="계약자 우편번호를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formContractorAddress1">
              <Form.Label column sm={4}>계약자 주소 1</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="contractorAddress1"
                  value={longData.contractorAddress1}
                  onChange={handleChange}
                  placeholder="계약자 주소를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formContractorAddress2">
              <Form.Label column sm={4}>계약자 주소 2</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="contractorAddress2"
                  value={longData.contractorAddress2}
                  onChange={handleChange}
                  placeholder="계약자 상세 주소를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRelationshipWithInsured">
              <Form.Label column sm={4}>피보험자와의 관계</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="relationshipWithInsured"
                  value={longData.relationshipWithInsured}
                  onChange={handleChange}
                  placeholder="피보험자와의 관계를 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formOccupation">
              <Form.Label column sm={4}>직업</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="occupation"
                  value={longData.occupation}
                  onChange={handleChange}
                  placeholder="직업을 입력하세요"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEntryDate">
              <Form.Label column sm={4}>가입일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="entryDate"
                  value={longData.entryDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCustomerCounselingContent">
              <Form.Label column sm={4}>고객 상담 내용</Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="customerCounselingContent"
                  value={longData.customerCounselingContent}
                  onChange={handleChange}
                  placeholder="고객 상담 내용을 입력하세요"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LongDetail;
