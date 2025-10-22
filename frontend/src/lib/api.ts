import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) =>
    api.post('/auth/register', userData),
  getProfile: () =>
    api.get('/auth/me'),
};

// Receipts API
export const receiptsAPI = {
  getAll: (params?: any) =>
    api.get('/receipts', { params }),
  getById: (id: string) =>
    api.get(`/receipts/${id}`),
  create: (data: any) =>
    api.post('/receipts', data),
  update: (id: string, data: any) =>
    api.put(`/receipts/${id}`, data),
  delete: (id: string) =>
    api.delete(`/receipts/${id}`),
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/receipts/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Invoices API
export const invoicesAPI = {
  getAll: (params?: any) =>
    api.get('/invoices', { params }),
  getById: (id: string) =>
    api.get(`/invoices/${id}`),
  create: (data: any) =>
    api.post('/invoices', data),
  update: (id: string, data: any) =>
    api.put(`/invoices/${id}`, data),
  delete: (id: string) =>
    api.delete(`/invoices/${id}`),
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/invoices/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Categories API
export const categoriesAPI = {
  getAll: () =>
    api.get('/categories'),
  getById: (id: string) =>
    api.get(`/categories/${id}`),
  create: (data: any) =>
    api.post('/categories', data),
  update: (id: string, data: any) =>
    api.put(`/categories/${id}`, data),
  delete: (id: string) =>
    api.delete(`/categories/${id}`),
};

// Tags API
export const tagsAPI = {
  getAll: () =>
    api.get('/tags'),
  getById: (id: string) =>
    api.get(`/tags/${id}`),
  create: (data: any) =>
    api.post('/tags', data),
  update: (id: string, data: any) =>
    api.put(`/tags/${id}`, data),
  delete: (id: string) =>
    api.delete(`/tags/${id}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params?: any) =>
    api.get('/analytics/dashboard', { params }),
  getTrends: (params?: any) =>
    api.get('/analytics/trends', { params }),
};

export default api;
