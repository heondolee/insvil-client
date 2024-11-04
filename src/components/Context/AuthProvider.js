import React, { useEffect, createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../Alayouts/ApiClient';

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // 유저 정보 상태 추가
  const [isCar, setIsCar] = useState('longTerm');
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
      const response = await apiClient.get('/login/auto');
      
      if (response.data.success) {
        setUser(response.data.user); // 유저 정보 저장
      }
    } catch (error) {
      console.error("Failed to fetch user info", error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  const logout = () => {
    localStorage.removeItem('insvilToken'); // 토큰 삭제
    setToken(null);
    setUser(null);  // 로그아웃 시 유저 정보 초기화
  };

  return (
    <AuthContext.Provider value={{ token, setToken, setUser, user, logout, isLoading, isCar, setIsCar }}>
      {children}
    </AuthContext.Provider>
  );
};

// 인증 상태를 쉽게 사용할 수 있는 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

// PrivateRoute 컴포넌트: 인증 상태에 따라 리다이렉트 또는 컴포넌트 렌더링
export const PrivateRoute = ({ children, role }) => {
  const { token, user, isLoading } = useAuth();

  // role를 문자열로 받아 배열로 변환
  const UserCodes = role.split(',').map(code => parseInt(code, 10)); // ['1', '2'] -> [1, 2]

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중
  }

  if (!token || (user && !UserCodes.includes(user.userCode))) { // 유효한 token 및 권한 체크
    return <Navigate to="/login" />;
  }

  return children;
};