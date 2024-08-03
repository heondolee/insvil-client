import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styles from '../css/Navigation.module.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Nav className={styles.nav} defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/long" 
            className={`${styles.navLink} ${location.pathname === '/long' ? styles.active : styles.inactive}`}
          >
            장기 보험
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/car" 
            className={`${styles.navLink} ${location.pathname === '/car' ? styles.active : styles.inactive}`}
          >
            자동차 보험
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/normal" 
            className={`${styles.navLink} ${location.pathname === '/normal' ? styles.active : styles.inactive}`}
          >
            일반 보험
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link}
            to="/employee" 
            className={`${styles.navLink} ${location.pathname === '/employee' ? styles.active : styles.inactive}`}
          >
            사용자 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link}
            to="/customer" 
            className={`${styles.navLink} ${location.pathname === '/customer' ? styles.active : styles.inactive}`}
          >
            고객 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Link 
            as={Link} 
            to="/reference" 
            className={`${styles.navLink} ${location.pathname === '/reference' ? styles.active : styles.inactive}`}
          >
            자료실
          </Nav.Link>
        <Nav.Item>
          <Nav.Link 
            as={Link}
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : styles.inactive}`}
          >
            로그아웃
          </Nav.Link>
        </Nav.Item>
      </Nav> 
    </div>
  );
}

export default Navigation;
