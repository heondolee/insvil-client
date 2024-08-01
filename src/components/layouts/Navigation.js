import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styles from '../css/Navibar.module.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/long" 
            className={location.pathname === '/long' ? styles.active : styles.inactive}
          >
            장기 보험
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/car" 
            className={location.pathname === '/car' ? styles.active : styles.inactive}
          >
            자동차 보험
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/normal" 
            className={location.pathname === '/normal' ? styles.active : styles.inactive}
          >
            일반 보험
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/employee" 
            className={location.pathname === '/employee' ? styles.active : styles.inactive}
          >
            사용자 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/" 
            className={location.pathname === '/' ? styles.active : styles.inactive}
          >
            로그아웃
          </Nav.Link>
        </Nav.Item>
      </Nav> 
    </div>
  );
}

export default Navigation;
