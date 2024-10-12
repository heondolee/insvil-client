import React, { useEffect, createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../Alayouts/ApiClient';

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // 유저 정보 상태 추가
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('insvilToken');
    setToken(storedToken);
    
    // 토큰이 있을 경우 자동으로 유저 정보를 가져옵니다.
    if (storedToken) {
      fetchUserInfo(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // 유저 정보를 API를 통해 가져오는 함수
  const fetchUserInfo = async (token) => {
    try {
      const response = await apiClient.get('/user/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setUser(response.data.user); // 유저 정보 저장
      }
    } catch (error) {
      console.error("Failed to fetch user info", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 빈 화면 또는 스피너를 표시
  }

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
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
