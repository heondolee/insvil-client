import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styles from '../../css/Navigation.module.css';
import { useAuth } from '../Context/AuthProvider';

import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  return (
    <div className="App">
      <Nav className={styles.nav} defaultActiveKey="/home">
        {user.role === 1 && (
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/long" 
              className={`${styles.navLink} ${location.pathname.startsWith('/long') ? styles.active : styles.inactive}`}
            >
              장기 보험
            </Nav.Link>
          </Nav.Item>
        )}
        {(user.role === 1 || user.role === 2) && (
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/car" 
              className={`${styles.navLink} ${location.pathname.startsWith('/car') ? styles.active : styles.inactive}`}
            >
              자동차 보험
            </Nav.Link>
          </Nav.Item>
        )}
        {user.role === 1 && (
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/normal" 
              className={`${styles.navLink} ${location.pathname.startsWith('/normal') ? styles.active : styles.inactive}`}
            >
              일반 보험
            </Nav.Link>
          </Nav.Item>
        )}
        {user.role === 1 && (
          <Nav.Item>
            <Nav.Link 
              as={Link}
              to="/employee" 
              className={`${styles.navLink} ${location.pathname.startsWith('/employee') ? styles.active : styles.inactive}`}
            >
              사용자 관리
            </Nav.Link>
          </Nav.Item>
        )}
        {user.role === 1 && (
          <Nav.Item>
            <Nav.Link 
              as={Link}
              to="/customer" 
              className={`${styles.navLink} ${location.pathname.startsWith('/customer') ? styles.active : styles.inactive}`}
            >
              고객 관리
            </Nav.Link>
          </Nav.Item>
        )}
        {user.role === 1 && (
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/reference" 
              className={`${styles.navLink} ${location.pathname.startsWith('/reference') ? styles.active : styles.inactive}`}
            >
              자료실
            </Nav.Link>
          </Nav.Item>
        )}
          <Nav.Item>
            <Nav.Link 
              as={Link}
              to="/login" 
              className={`${styles.navLink} ${location.pathname.startsWith('/login') ? styles.active : styles.inactive}`}
              onClick={() => {
                localStorage.removeItem('insvilToken'); // 토큰 삭제
                navigate('/login'); // 로그인 페이지로 이동
              }}
            >
              로그아웃
            </Nav.Link>
          </Nav.Item>
      </Nav> 
    </div>
  );
}

export default Navigation;
