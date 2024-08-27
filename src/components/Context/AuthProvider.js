import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';


// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('insvilToken'));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// 인증 상태를 쉽게 사용할 수 있는 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

// PrivateRoute에서 Context를 사용하여 인증 상태 체크
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

