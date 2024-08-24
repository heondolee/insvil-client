import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const NormalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [normalData, setNormalData] = useState({
    manager: '',
    branch: '',
    team: '',
    managerName: '',
    userId: '',
    realUser: '',
    contractCompany: '',
    longTermProduct: '',
    insurancePremium: '',
    revisedPremium: '',
    revisionRate: '',
    insuredPerson: '',
    birthdateGender: '',
    policyholder: '',
    policyholderBirthdateGender: '',
    policyNumber: '',
    design: '',
    consultationStatus: '',
    contractStatus: '',
    paymentStartDate: '',
    paymentEndDate: '',
    paymentPeriod: '',
    contractDate: '',
    paymentDate: '',
    coverageStartDate: '',
    coverageEndDate: '',
    consultationChannel: '',
    additionalInfo1: '',
    paymentMethod: '',
    paymentCount: '',
    totalPayments: '',
    consultant: '',
    percent: '',
    CyberMoney: '',
    gift: '',
    policyDispatchDate: '',
    signatureDate: '',
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
    insuredPersonZipcode: '',
    insuredPersonAddress1: '',
    insuredPersonAddress2: '',
    policyholderZipcode: '',
    policyholderAddress1: '',
    policyholderAddress2: '',
    relationToInsured: '',
    occupation: '',
    entryDate: '',
    normalConsultationContent: '',
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
      const fetchNormalData = async () => {
        try {
          const response = await axios.post(`${API_URL}/normal/detail`, { id });
          setNormalData(response.data);
        } catch (error) {
          setError("사용자 데이터를 가져오는 중 오류가 발생했습니다.");
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchNormalData();
    } else {
      setNormalData((prevData) => ({
        ...prevData,
        contractDate: getCurrentDate(),
      }));
      setLoading(false);
    }

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNormalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!normalData.insuredPerson || normalData.insuredPerson.trim() === "") {
        alert("피보험자를 입력하세요.");
        return;
      }

      if (!normalData.contractDate || normalData.contractDate.trim() === "") {
        alert("계약일을 입력하세요.");
        return;
      }

      if (!normalData.paymentStartDate || normalData.paymentStartDate.trim() === "") {
        alert("개시일을 입력하세요.");
        return;
      }

      if (!normalData.paymentEndDate || normalData.paymentEndDate.trim() === "") {
        alert("만기일을 입력하세요.");
        return;
      }

      const endpoint = id === undefined ? '/normal/create' : '/normal/update';
      await axios.post(`${API_URL}${endpoint}`, normalData);
      navigate('/normal');
      alert("데이터가 저장되었습니다.");
    } catch (error) {
      setError("데이터를 저장하는 중 오류가 발생했습니다.");
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    navigate('/normal');
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        await axios.delete(`${API_URL}/normal/delete`, {
          data: { id: normalData.id },
        });
        navigate('/normal');
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
                <Form.Group as={Row} controlId="formInsuredPerson">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>피보험자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredPerson"
                      value={normalData.insuredPerson}
                      onChange={handleChange}
                      placeholder="피보험자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formManager">
                  <Form.Label column sm={2}>담당자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="manager"
                      value={normalData.manager}
                      onChange={handleChange}
                      placeholder="담당자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBranch">
                  <Form.Label column sm={2}>지점</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="branch"
                      value={normalData.branch}
                      onChange={handleChange}
                      placeholder="지점을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTeam">
                  <Form.Label column sm={2}>팀</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="team"
                      value={normalData.team}
                      onChange={handleChange}
                      placeholder="팀을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formManagerName">
                  <Form.Label column sm={2}>담당자 ID</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="managerName"
                      value={normalData.managerName}
                      onChange={handleChange}
                      placeholder="담당자 ID를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUserId">
                  <Form.Label column sm={2}>유저 ID</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="userId"
                      value={normalData.userId}
                      onChange={handleChange}
                      placeholder="유저 ID를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRealUser">
                  <Form.Label column sm={2}>실제 사용자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="realUser"
                      value={normalData.realUser}
                      onChange={handleChange}
                      placeholder="실제 사용자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractCompany">
                  <Form.Label column sm={2}>계약 회사</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractCompany"
                      value={normalData.contractCompany}
                      onChange={handleChange}
                      placeholder="계약 회사를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLongTermProduct">
                  <Form.Label column sm={2}>장기 상품</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="longTermProduct"
                      value={normalData.longTermProduct}
                      onChange={handleChange}
                      placeholder="장기 상품을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsurancePremium">
                  <Form.Label column sm={2}>보험료</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insurancePremium"
                      value={normalData.insurancePremium}
                      onChange={handleChange}
                      placeholder="보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRevisedPremium">
                  <Form.Label column sm={2}>수정된 보험료</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="revisedPremium"
                      value={normalData.revisedPremium}
                      onChange={handleChange}
                      placeholder="수정된 보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRevisionRate">
                  <Form.Label column sm={2}>수정 비율</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="revisionRate"
                      value={normalData.revisionRate}
                      onChange={handleChange}
                      placeholder="수정 비율을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBirthdateGender">
                  <Form.Label column sm={2}>생년월일 및 성별</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="birthdateGender"
                      value={normalData.birthdateGender}
                      onChange={handleChange}
                      placeholder="생년월일 및 성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyholder">
                  <Form.Label column sm={2}>보험 계약자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="policyholder"
                      value={normalData.policyholder}
                      onChange={handleChange}
                      placeholder="보험 계약자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyholderBirthdateGender">
                  <Form.Label column sm={2}>보험 계약자 생년월일 및 성별</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="policyholderBirthdateGender"
                      value={normalData.policyholderBirthdateGender}
                      onChange={handleChange}
                      placeholder="보험 계약자 생년월일 및 성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyNumber">
                  <Form.Label column sm={2}>보험 계약 번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="policyNumber"
                      value={normalData.policyNumber}
                      onChange={handleChange}
                      placeholder="보험 계약 번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDesign">
                  <Form.Label column sm={2}>디자인</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="design"
                      value={normalData.design}
                      onChange={handleChange}
                      placeholder="디자인을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsultationStatus">
                  <Form.Label column sm={2}>상담 상태</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="consultationStatus"
                      value={normalData.consultationStatus}
                      onChange={handleChange}
                      placeholder="상담 상태를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractStatus">
                  <Form.Label column sm={2}>계약 상태</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractStatus"
                      value={normalData.contractStatus}
                      onChange={handleChange}
                      placeholder="계약 상태를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentPeriod">
                  <Form.Label column sm={2}>지급 기간</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="paymentPeriod"
                      value={normalData.paymentPeriod}
                      onChange={handleChange}
                      placeholder="지급 기간을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractDate">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>계약일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="contractDate"
                      value={normalData.contractDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentStartDate">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>개시일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="paymentStartDate"
                      value={normalData.paymentStartDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentEndDate">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>만기일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="paymentEndDate"
                      value={normalData.paymentEndDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCoverageStartDate">
                  <Form.Label column sm={2}>보장 시작일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="coverageStartDate"
                      value={normalData.coverageStartDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCoverageEndDate">
                  <Form.Label column sm={2}>보장 만기일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="coverageEndDate"
                      value={normalData.coverageEndDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentDate">
                  <Form.Label column sm={2}>지급일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="paymentDate"
                      value={normalData.paymentDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsultationChannel">
                  <Form.Label column sm={2}>상담 채널</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="consultationChannel"
                      value={normalData.consultationChannel}
                      onChange={handleChange}
                      placeholder="상담 채널을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAdditionalInfo1">
                  <Form.Label column sm={2}>추가 정보 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="additionalInfo1"
                      value={normalData.additionalInfo1}
                      onChange={handleChange}
                      placeholder="추가 정보를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentMethod">
                  <Form.Label column sm={2}>지불 방법</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="paymentMethod"
                      value={normalData.paymentMethod}
                      onChange={handleChange}
                      placeholder="지불 방법을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentCount">
                  <Form.Label column sm={2}>지불 횟수</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="paymentCount"
                      value={normalData.paymentCount}
                      onChange={handleChange}
                      placeholder="지불 횟수를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTotalPayments">
                  <Form.Label column sm={2}>총 지불 금액</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="totalPayments"
                      value={normalData.totalPayments}
                      onChange={handleChange}
                      placeholder="총 지불 금액을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsultant">
                  <Form.Label column sm={2}>상담자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="consultant"
                      value={normalData.consultant}
                      onChange={handleChange}
                      placeholder="상담자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPercent">
                  <Form.Label column sm={2}>퍼센트</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="percent"
                      value={normalData.percent}
                      onChange={handleChange}
                      placeholder="퍼센트를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCyberMoney">
                  <Form.Label column sm={2}>사이버 머니</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="CyberMoney"
                      value={normalData.CyberMoney}
                      onChange={handleChange}
                      placeholder="사이버 머니를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGift">
                  <Form.Label column sm={2}>선물</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="gift"
                      value={normalData.gift}
                      onChange={handleChange}
                      placeholder="선물을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyDispatchDate">
                  <Form.Label column sm={2}>보험 발송일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="policyDispatchDate"
                      value={normalData.policyDispatchDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSignatureDate">
                  <Form.Label column sm={2}>서명일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="signatureDate"
                      value={normalData.signatureDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeContent1">
                  <Form.Label column sm={2}>변경 내용 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="changeContent1"
                      value={normalData.changeContent1}
                      onChange={handleChange}
                      placeholder="변경 내용을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeDate1">
                  <Form.Label column sm={2}>변경 날짜 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="changeDate1"
                      value={normalData.changeDate1}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeContent2">
                  <Form.Label column sm={2}>변경 내용 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="changeContent2"
                      value={normalData.changeContent2}
                      onChange={handleChange}
                      placeholder="변경 내용을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeDate2">
                  <Form.Label column sm={2}>변경 날짜 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="changeDate2"
                      value={normalData.changeDate2}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeContent3">
                  <Form.Label column sm={2}>변경 내용 3</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="changeContent3"
                      value={normalData.changeContent3}
                      onChange={handleChange}
                      placeholder="변경 내용을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeDate3">
                  <Form.Label column sm={2}>변경 날짜 3</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="changeDate3"
                      value={normalData.changeDate3}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeContent4">
                  <Form.Label column sm={2}>변경 내용 4</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="changeContent4"
                      value={normalData.changeContent4}
                      onChange={handleChange}
                      placeholder="변경 내용을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeDate4">
                  <Form.Label column sm={2}>변경 날짜 4</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="changeDate4"
                      value={normalData.changeDate4}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeContent5">
                  <Form.Label column sm={2}>변경 내용 5</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="changeContent5"
                      value={normalData.changeContent5}
                      onChange={handleChange}
                      placeholder="변경 내용을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formChangeDate5">
                  <Form.Label column sm={2}>변경 날짜 5</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="changeDate5"
                      value={normalData.changeDate5}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredPersonZipcode">
                  <Form.Label column sm={2}>피보험자 우편번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredPersonZipcode"
                      value={normalData.insuredPersonZipcode}
                      onChange={handleChange}
                      placeholder="피보험자 우편번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredPersonAddress1">
                  <Form.Label column sm={2}>피보험자 주소 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredPersonAddress1"
                      value={normalData.insuredPersonAddress1}
                      onChange={handleChange}
                      placeholder="피보험자 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredPersonAddress2">
                  <Form.Label column sm={2}>피보험자 주소 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredPersonAddress2"
                      value={normalData.insuredPersonAddress2}
                      onChange={handleChange}
                      placeholder="피보험자 상세 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyholderZipcode">
                  <Form.Label column sm={2}>보험 계약자 우편번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="policyholderZipcode"
                      value={normalData.policyholderZipcode}
                      onChange={handleChange}
                      placeholder="보험 계약자 우편번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyholderAddress1">
                  <Form.Label column sm={2}>보험 계약자 주소 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="policyholderAddress1"
                      value={normalData.policyholderAddress1}
                      onChange={handleChange}
                      placeholder="보험 계약자 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPolicyholderAddress2">
                  <Form.Label column sm={2}>보험 계약자 주소 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="policyholderAddress2"
                      value={normalData.policyholderAddress2}
                      onChange={handleChange}
                      placeholder="보험 계약자 상세 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRelationToInsured">
                  <Form.Label column sm={2}>피보험자와의 관계</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="relationToInsured"
                      value={normalData.relationToInsured}
                      onChange={handleChange}
                      placeholder="피보험자와의 관계를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOccupation">
                  <Form.Label column sm={2}>직업</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="occupation"
                      value={normalData.occupation}
                      onChange={handleChange}
                      placeholder="직업을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEntryDate">
                  <Form.Label column sm={2}>가입일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="entryDate"
                      value={normalData.entryDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formnormalConsultationContent">
                  <Form.Label column sm={2}>고객 상담 내용</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="normalConsultationContent"
                      value={normalData.normalConsultationContent}
                      onChange={handleChange}
                      placeholder="고객 상담 내용을 입력하세요"
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

export default NormalDetail;
