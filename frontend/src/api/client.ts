import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://api.example.com/v1';

const createApiClient = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const apiClient = axios.create(config);

  // Add request interceptor for auth token
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const apiClient = createApiClient();
