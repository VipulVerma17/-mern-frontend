import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // Return only the data part of the response
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      // Return error with structured format
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        errors: data?.errors || [],
        data: data?.data || null,
      });
    } else if (error.request) {
      // Request made but no response received
      const requestUrl = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
      return Promise.reject({
        status: 0,
        message: `No response from server at ${requestUrl}. Please check your connection.`,
        errors: [],
        url: requestUrl,
      });
    } else {
      // Error in request setup
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        errors: [],
      });
    }
  }
);

export default api;
