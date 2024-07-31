import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <div className="App">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/long">장기 보험</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/car">자동차 보험</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/normal">일반 보험</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/">로그아웃</Nav.Link>
        </Nav.Item>
      </Nav> 
    </div>
  );
}

export default Navigation;
