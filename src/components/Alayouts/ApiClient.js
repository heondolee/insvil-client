import axios from 'axios';

const token = localStorage.getItem('insvilToken'); // 예시로 로컬 스토리지에서 토큰을 가져옴
const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default apiClient;