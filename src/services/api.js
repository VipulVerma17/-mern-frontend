import axios from 'axios';

const fallbackBaseURL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || fallbackBaseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
