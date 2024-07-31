import React from 'react';
import { Link } from 'react-router-dom'; // Named import for Link
import { Button } from 'react-bootstrap';

const Login = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <Button as={Link} to="/long">장기보험 바로가기</Button>
    </div>
  );
};

export default Login;
