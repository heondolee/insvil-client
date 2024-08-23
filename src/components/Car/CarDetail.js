import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    branch: '',
    team: '',
    personInCharge: '',
    responsibilityName: '',
    userName: '',
    user: '',
    contractCompany: '',
    agencyCode: '',
    agencyName: '',
    oneYearPremium: '',
    firstPremium: '',
    installmentPremium: '',
    insured: '',
    insuredBirthGender: '',
    contractor: '',
    contractorBirthGender: '',
    carNumber: '',
    design: '',
    consultingStatus: '',
    contractStatus: '',
    objectClassification: '',
    startDate: '',
    endDate: '',
    receiptDate: '',
    consultationPath: '',
    etc1: '',
    paymentMethod: '',
    consultant: '',
    percentage: '',
    cyberMoney: '',
    gift: '',
    designNumber: '',
    insuranceNumber: '',
    previousContractCompany: '',
    insuredPostalCode: '',
    insuredAddress1: '',
    insuredAddress2: '',
    contractorPostalCode: '',
    contractorAddress1: '',
    contractorAddress2: '',
    relationshipWithInsured: '',
    relationshipWithSpecifiedPerson: '',
    specifiedPersonName: '',
    minDriverName: '',
    spouseName: '',
    insuranceType: '',
    carType: '',
    mileageApplication: '',
    ageRestriction: '',
    driverRestriction: '',
    carNameCode: '',
    year: '',
    carName: '',
    displacement: '',
    specialRate: '',
    accessories: '',
    accessoryPrice: '',
    carValue: '',
    totalCar: '',
    liability1: '',
    liability2: '',
    propertyDamage: '',
    personalInjury: '',
    uninsuredMotorist: '',
    ownDamage: '',
    emergencyDispatch: '',
    subscriptionExperience: '',
    legalViolations: '',
    discountSurcharge: '',
    specialSurcharge1: '',
    specialSurcharge2: '',
    threeYearAccidentRate: '',
    oneYearAccidentScore: '',
    threeYearAccidentScore: '',
    carSubscriptionExperience: '',
    otherOwnedCars: '',
    currentMileage: '',
    annualMileage: '',
    mileageDiscount: '',
    inputDate: '',
    customerConsultation: '',
    preConsent: '',
    consentDate: '',
    preConsentNumber: ''
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
    if (id !== undefined) {
      const fetchCarData = async () => {
        try {
          const response = await axios.post(`${API_URL}/car/detail`, { id });
          setCarData(response.data);
        } catch (error) {
          setError("데이터를 가져오는 중 오류가 발생했습니다.");
          console.error("Error fetching car data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCarData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!carData.contractor || carData.contractor.trim() === "") {
        alert("계약자를 입력하세요.");
        return;
      }

      if (!carData.inputDate || carData.inputDate.trim() === "") {
        alert("입력일을 입력하세요.");
        return;
      }

      if (!carData.startDate || carData.startDate.trim() === "") {
        alert("개시일을 입력하세요.");
        return;
      }

      if (!carData.endDate || carData.endDate.trim() === "") {
        alert("만기일을 입력하세요.");
        return;
      }
  
      const endpoint = id === 'new' ? '/car/create' : '/car/update';
      await axios.post(`${API_URL}${endpoint}`, carData);
      navigate('/car');
      alert("데이터가 저장되었습니다.");
    } catch (error) {
      setError("데이터를 저장하는 중 오류가 발생했습니다.");
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    navigate('/car');
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        await axios.delete(`${API_URL}/car/delete`, {
          data: { id: carData.id },
        });
        navigate('/car');
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
                <Form.Group as={Row} controlId="formBranch">
                  <Form.Label column sm={2}>지점</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="branch"
                      value={carData.branch}
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
                      value={carData.team}
                      onChange={handleChange}
                      placeholder="팀을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPersonInCharge">
                  <Form.Label column sm={2}>책임자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="personInCharge"
                      value={carData.personInCharge}
                      onChange={handleChange}
                      placeholder="책임자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formResponsibilityName">
                  <Form.Label column sm={2}>책임자 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="responsibilityName"
                      value={carData.responsibilityName}
                      onChange={handleChange}
                      placeholder="책임자 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUserName">
                  <Form.Label column sm={2}>사용자 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={carData.userName}
                      onChange={handleChange}
                      placeholder="사용자 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUser">
                  <Form.Label column sm={2}>사용자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="user"
                      value={carData.user}
                      onChange={handleChange}
                      placeholder="사용자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractCompany">
                  <Form.Label column sm={2}>계약 회사</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractCompany"
                      value={carData.contractCompany}
                      onChange={handleChange}
                      placeholder="계약 회사를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAgencyCode">
                  <Form.Label column sm={2}>대리점 코드</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="agencyCode"
                      value={carData.agencyCode}
                      onChange={handleChange}
                      placeholder="대리점 코드를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAgencyName">
                  <Form.Label column sm={2}>대리점 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="agencyName"
                      value={carData.agencyName}
                      onChange={handleChange}
                      placeholder="대리점 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOneYearPremium">
                  <Form.Label column sm={2}>1년 보험료</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="oneYearPremium"
                      value={carData.oneYearPremium}
                      onChange={handleChange}
                      placeholder="1년 보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formFirstPremium">
                  <Form.Label column sm={2}>초기 보험료</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="firstPremium"
                      value={carData.firstPremium}
                      onChange={handleChange}
                      placeholder="초기 보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInstallmentPremium">
                  <Form.Label column sm={2}>할부 보험료</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="installmentPremium"
                      value={carData.installmentPremium}
                      onChange={handleChange}
                      placeholder="할부 보험료를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsured">
                  <Form.Label column sm={2}>피보험자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insured"
                      value={carData.insured}
                      onChange={handleChange}
                      placeholder="피보험자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredBirthGender">
                  <Form.Label column sm={2}>피보험자 생년월일/성별</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredBirthGender"
                      value={carData.insuredBirthGender}
                      onChange={handleChange}
                      placeholder="생년월일/성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractor">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>계약자</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractor"
                      value={carData.contractor}
                      onChange={handleChange}
                      placeholder="계약자를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractorBirthGender">
                  <Form.Label column sm={2}>계약자 생년월일/성별</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractorBirthGender"
                      value={carData.contractorBirthGender}
                      onChange={handleChange}
                      placeholder="계약자 생년월일/성별을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarNumber">
                  <Form.Label column sm={2}>자동차 번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="carNumber"
                      value={carData.carNumber}
                      onChange={handleChange}
                      placeholder="자동차 번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDesign">
                  <Form.Label column sm={2}>설계</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="design"
                      value={carData.design}
                      onChange={handleChange}
                      placeholder="설계를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsultingStatus">
                  <Form.Label column sm={2}>상담 상태</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="consultingStatus"
                      value={carData.consultingStatus}
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
                      value={carData.contractStatus}
                      onChange={handleChange}
                      placeholder="계약 상태를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formObjectClassification">
                  <Form.Label column sm={2}>객체 분류</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="objectClassification"
                      value={carData.objectClassification}
                      onChange={handleChange}
                      placeholder="객체 분류를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInputDate">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>입력일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="inputDate"
                      value={getCurrentDate()}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formStartDate">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>개시일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={carData.startDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEndDate">
                  <Form.Label column sm={2} style={{ color: 'blue' }}>만기일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={carData.endDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formReceiptDate">
                  <Form.Label column sm={2}>수령일</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="receiptDate"
                      value={carData.receiptDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsultationPath">
                  <Form.Label column sm={2}>상담 경로</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="consultationPath"
                      value={carData.consultationPath}
                      onChange={handleChange}
                      placeholder="상담 경로를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEtc1">
                  <Form.Label column sm={2}>기타 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="etc1"
                      value={carData.etc1}
                      onChange={handleChange}
                      placeholder="기타 정보를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPaymentMethod">
                  <Form.Label column sm={2}>납입 방법</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="paymentMethod"
                      value={carData.paymentMethod}
                      onChange={handleChange}
                      placeholder="납입 방법을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsultant">
                  <Form.Label column sm={2}>상담원</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="consultant"
                      value={carData.consultant}
                      onChange={handleChange}
                      placeholder="상담원을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPercentage">
                  <Form.Label column sm={2}>퍼센트</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="percentage"
                      value={carData.percentage}
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
                      name="cyberMoney"
                      value={carData.cyberMoney}
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
                      value={carData.gift}
                      onChange={handleChange}
                      placeholder="선물을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDesignNumber">
                  <Form.Label column sm={2}>설계 번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="designNumber"
                      value={carData.designNumber}
                      onChange={handleChange}
                      placeholder="설계 번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuranceNumber">
                  <Form.Label column sm={2}>보험 번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuranceNumber"
                      value={carData.insuranceNumber}
                      onChange={handleChange}
                      placeholder="보험 번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPreviousContractCompany">
                  <Form.Label column sm={2}>이전 계약 회사</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="previousContractCompany"
                      value={carData.previousContractCompany}
                      onChange={handleChange}
                      placeholder="이전 계약 회사를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredPostalCode">
                  <Form.Label column sm={2}>피보험자 우편번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredPostalCode"
                      value={carData.insuredPostalCode}
                      onChange={handleChange}
                      placeholder="피보험자 우편번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredAddress1">
                  <Form.Label column sm={2}>피보험자 주소 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredAddress1"
                      value={carData.insuredAddress1}
                      onChange={handleChange}
                      placeholder="피보험자 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuredAddress2">
                  <Form.Label column sm={2}>피보험자 주소 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuredAddress2"
                      value={carData.insuredAddress2}
                      onChange={handleChange}
                      placeholder="피보험자 상세 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractorPostalCode">
                  <Form.Label column sm={2}>계약자 우편번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractorPostalCode"
                      value={carData.contractorPostalCode}
                      onChange={handleChange}
                      placeholder="계약자 우편번호를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractorAddress1">
                  <Form.Label column sm={2}>계약자 주소 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractorAddress1"
                      value={carData.contractorAddress1}
                      onChange={handleChange}
                      placeholder="계약자 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formContractorAddress2">
                  <Form.Label column sm={2}>계약자 주소 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="contractorAddress2"
                      value={carData.contractorAddress2}
                      onChange={handleChange}
                      placeholder="계약자 상세 주소를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRelationshipWithInsured">
                  <Form.Label column sm={2}>피보험자와의 관계</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="relationshipWithInsured"
                      value={carData.relationshipWithInsured}
                      onChange={handleChange}
                      placeholder="피보험자와의 관계를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRelationshipWithSpecifiedPerson">
                  <Form.Label column sm={2}>지정된 사람과의 관계</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="relationshipWithSpecifiedPerson"
                      value={carData.relationshipWithSpecifiedPerson}
                      onChange={handleChange}
                      placeholder="지정된 사람과의 관계를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSpecifiedPersonName">
                  <Form.Label column sm={2}>지정된 사람 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="specifiedPersonName"
                      value={carData.specifiedPersonName}
                      onChange={handleChange}
                      placeholder="지정된 사람 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMinDriverName">
                  <Form.Label column sm={2}>최소 운전자 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="minDriverName"
                      value={carData.minDriverName}
                      onChange={handleChange}
                      placeholder="최소 운전자 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSpouseName">
                  <Form.Label column sm={2}>배우자 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="spouseName"
                      value={carData.spouseName}
                      onChange={handleChange}
                      placeholder="배우자 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInsuranceType">
                  <Form.Label column sm={2}>보험 유형</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="insuranceType"
                      value={carData.insuranceType}
                      onChange={handleChange}
                      placeholder="보험 유형을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarType">
                  <Form.Label column sm={2}>자동차 유형</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="carType"
                      value={carData.carType}
                      onChange={handleChange}
                      placeholder="자동차 유형을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMileageApplication">
                  <Form.Label column sm={2}>주행거리 신청</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="mileageApplication"
                      value={carData.mileageApplication}
                      onChange={handleChange}
                      placeholder="주행거리 신청을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAgeRestriction">
                  <Form.Label column sm={2}>연령 제한</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="ageRestriction"
                      value={carData.ageRestriction}
                      onChange={handleChange}
                      placeholder="연령 제한을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDriverRestriction">
                  <Form.Label column sm={2}>운전자 제한</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="driverRestriction"
                      value={carData.driverRestriction}
                      onChange={handleChange}
                      placeholder="운전자 제한을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarNameCode">
                  <Form.Label column sm={2}>차 이름 코드</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="carNameCode"
                      value={carData.carNameCode}
                      onChange={handleChange}
                      placeholder="차 이름 코드를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formYear">
                  <Form.Label column sm={2}>연도</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="year"
                      value={carData.year}
                      onChange={handleChange}
                      placeholder="연도를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarName">
                  <Form.Label column sm={2}>차 이름</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="carName"
                      value={carData.carName}
                      onChange={handleChange}
                      placeholder="차 이름을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDisplacement">
                  <Form.Label column sm={2}>배기량</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="displacement"
                      value={carData.displacement}
                      onChange={handleChange}
                      placeholder="배기량을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSpecialRate">
                  <Form.Label column sm={2}>특별 요율</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="specialRate"
                      value={carData.specialRate}
                      onChange={handleChange}
                      placeholder="특별 요율을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAccessories">
                  <Form.Label column sm={2}>부속품</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="accessories"
                      value={carData.accessories}
                      onChange={handleChange}
                      placeholder="부속품을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAccessoryPrice">
                  <Form.Label column sm={2}>부속품 가격</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="accessoryPrice"
                      value={carData.accessoryPrice}
                      onChange={handleChange}
                      placeholder="부속품 가격을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarValue">
                  <Form.Label column sm={2}>자동차 가치</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="carValue"
                      value={carData.carValue}
                      onChange={handleChange}
                      placeholder="자동차 가치를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTotalCar">
                  <Form.Label column sm={2}>총 자동차</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="totalCar"
                      value={carData.totalCar}
                      onChange={handleChange}
                      placeholder="총 자동차를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLiability1">
                  <Form.Label column sm={2}>책임 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="liability1"
                      value={carData.liability1}
                      onChange={handleChange}
                      placeholder="책임 1을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLiability2">
                  <Form.Label column sm={2}>책임 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="liability2"
                      value={carData.liability2}
                      onChange={handleChange}
                      placeholder="책임 2를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPropertyDamage">
                  <Form.Label column sm={2}>재산 피해</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="propertyDamage"
                      value={carData.propertyDamage}
                      onChange={handleChange}
                      placeholder="재산 피해를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPersonalInjury">
                  <Form.Label column sm={2}>개인 상해</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="personalInjury"
                      value={carData.personalInjury}
                      onChange={handleChange}
                      placeholder="개인 상해를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUninsuredMotorist">
                  <Form.Label column sm={2}>보험 미가입 차량</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="uninsuredMotorist"
                      value={carData.uninsuredMotorist}
                      onChange={handleChange}
                      placeholder="보험 미가입 차량을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOwnDamage">
                  <Form.Label column sm={2}>자기 손해</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="ownDamage"
                      value={carData.ownDamage}
                      onChange={handleChange}
                      placeholder="자기 손해를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmergencyDispatch">
                  <Form.Label column sm={2}>긴급 출동</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="emergencyDispatch"
                      value={carData.emergencyDispatch}
                      onChange={handleChange}
                      placeholder="긴급 출동을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSubscriptionExperience">
                  <Form.Label column sm={2}>가입 경험</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="subscriptionExperience"
                      value={carData.subscriptionExperience}
                      onChange={handleChange}
                      placeholder="가입 경험을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formLegalViolations">
                  <Form.Label column sm={2}>법적 위반</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="legalViolations"
                      value={carData.legalViolations}
                      onChange={handleChange}
                      placeholder="법적 위반을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDiscountSurcharge">
                  <Form.Label column sm={2}>할인/할증</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="discountSurcharge"
                      value={carData.discountSurcharge}
                      onChange={handleChange}
                      placeholder="할인/할증을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSpecialSurcharge1">
                  <Form.Label column sm={2}>특별 할증 1</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="specialSurcharge1"
                      value={carData.specialSurcharge1}
                      onChange={handleChange}
                      placeholder="특별 할증 1을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSpecialSurcharge2">
                  <Form.Label column sm={2}>특별 할증 2</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="specialSurcharge2"
                      value={carData.specialSurcharge2}
                      onChange={handleChange}
                      placeholder="특별 할증 2를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formThreeYearAccidentRate">
                  <Form.Label column sm={2}>3년 사고율</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="threeYearAccidentRate"
                      value={carData.threeYearAccidentRate}
                      onChange={handleChange}
                      placeholder="3년 사고율을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOneYearAccidentScore">
                  <Form.Label column sm={2}>1년 사고 점수</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="oneYearAccidentScore"
                      value={carData.oneYearAccidentScore}
                      onChange={handleChange}
                      placeholder="1년 사고 점수를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formThreeYearAccidentScore">
                  <Form.Label column sm={2}>3년 사고 점수</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="threeYearAccidentScore"
                      value={carData.threeYearAccidentScore}
                      onChange={handleChange}
                      placeholder="3년 사고 점수를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCarSubscriptionExperience">
                  <Form.Label column sm={2}>자동차 가입 경험</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="carSubscriptionExperience"
                      value={carData.carSubscriptionExperience}
                      onChange={handleChange}
                      placeholder="자동차 가입 경험을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOtherOwnedCars">
                  <Form.Label column sm={2}>다른 소유 차량</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="otherOwnedCars"
                      value={carData.otherOwnedCars}
                      onChange={handleChange}
                      placeholder="다른 소유 차량을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCurrentMileage">
                  <Form.Label column sm={2}>현재 주행거리</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="currentMileage"
                      value={carData.currentMileage}
                      onChange={handleChange}
                      placeholder="현재 주행거리를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAnnualMileage">
                  <Form.Label column sm={2}>연간 주행거리</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="annualMileage"
                      value={carData.annualMileage}
                      onChange={handleChange}
                      placeholder="연간 주행거리를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMileageDiscount">
                  <Form.Label column sm={2}>주행거리 할인</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="mileageDiscount"
                      value={carData.mileageDiscount}
                      onChange={handleChange}
                      placeholder="주행거리 할인을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCustomerConsultation">
                  <Form.Label column sm={2}>고객 상담</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="customerConsultation"
                      value={carData.customerConsultation}
                      onChange={handleChange}
                      placeholder="고객 상담 내용을 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPreConsent">
                  <Form.Label column sm={2}>사전 동의</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="preConsent"
                      value={carData.preConsent}
                      onChange={handleChange}
                      placeholder="사전 동의를 입력하세요"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConsentDate">
                  <Form.Label column sm={2}>동의 날짜</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      name="consentDate"
                      value={carData.consentDate}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPreConsentNumber">
                  <Form.Label column sm={2}>사전 동의 번호</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="preConsentNumber"
                      value={carData.preConsentNumber}
                      onChange={handleChange}
                      placeholder="사전 동의 번호를 입력하세요"
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

export default CarDetail;
