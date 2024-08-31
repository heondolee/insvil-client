import React, { useEffect, createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../Alayouts/ApiClient';

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('insvilToken');
    setToken(storedToken);
    setIsLoading(false); // 토큰을 불러온 후 로딩 상태를 false로 설정
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 빈 화면 또는 스피너를 표시
  }

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

// PrivateRoute 컴포넌트: 인증 상태에 따라 리다이렉트 또는 컴포넌트 렌더링
export const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isValid, setIsValid] = useState(false); // 토큰 유효성 상태 추가

  useEffect(() => {
    const validateToken = async () => {
      try {
        // 토큰이 있을 때만 API 요청을 수행합니다.
        if (token) {
          const response = await apiClient.get('/login/auto');
          
          if (response.data.success) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        } else {
          setIsValid(false);
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken(); // 토큰 유무, 인증 검사
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 빈 화면 또는 스피너를 표시
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
};
