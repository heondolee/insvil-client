import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, Table, Container, Row, Col, InputGroup } from 'react-bootstrap';
import Navigation from './layouts/Navigation'; // Navigation 컴포넌트 임포트
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {


  return (
    <div>
      <Navigation />
      <Container>
        <h1>홈 페이지</h1>
      </Container>
    </div>
  );
};

export default Home;
