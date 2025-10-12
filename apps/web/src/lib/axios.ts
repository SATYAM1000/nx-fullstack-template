import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: typeof window !== 'undefined' ? 'localhost:5173' : '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = '124'; //TODO: make it dynamic as per client and server
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data;

    const apiError = {
      message: error?.message || 'Something went wrong',
      status: status,
      data: data,
    };

    switch (status) {
      case 401:
        console.warn('[API Error] 401 Unauthorized');
        break;
      case 403:
        console.warn('[API Error] 403 Forbidden');
        break;
      case 404:
        console.warn('[API Error] 404 Not Found');
        break;
      case 500:
        console.error('[API Error] 500 Internal Server Error');
        break;
      default:
        console.error('[API Error] No response from server');
        break;
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
