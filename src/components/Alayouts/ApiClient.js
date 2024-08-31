import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('insvilToken'); // 요청 전에 항상 최신 토큰을 가져옵니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

// async function fetchData() {
//   try {
//     const response = await apiClient.get('/data');
//     console.log(response.data);
//   } catch (error) {
//     console.error('There was an error!', error);
//   }
// }

// // 함수 호출
// fetchData();
