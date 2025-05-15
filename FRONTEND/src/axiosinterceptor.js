import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '/api/',
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('logintoken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
