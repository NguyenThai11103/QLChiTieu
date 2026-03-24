import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

// Next.js API Routes — same origin, cookie-based auth
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // gửi httpOnly cookie tự động
  timeout: 15000,
});

// Request interceptor (cookie gửi tự động, không cần Bearer)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — unwrap { success, data }
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
        // window.location.href = '/login'; // bỏ comment khi bật auth check
      }
    }
    if (error.response?.status === 403) {
      if (error.config?.method?.toLowerCase() !== 'get') {
        toast.error(error.response?.data?.message || 'Không có quyền thực hiện hành động này');
      }
    }
    let formatted = error.response?.data;
    if (typeof formatted !== 'object' || formatted === null) {
      formatted = {
        success: false,
        message: error.message || 'Lỗi kết nối Backend (Server trả về HTML string)',
      };
    }
    if (error.response) {
      formatted.status = error.response.status;
    }
    return Promise.reject(formatted);
  }
);

export default apiClient;
