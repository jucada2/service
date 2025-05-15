import axios from 'axios';
import API_CONFIG from '../config/api.config';

class ApiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api', //balanceador de carga
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor for authentication
    this.axiosInstance.interceptors.request.use(
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
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await this.refreshToken(refreshToken);
            const { token } = response.data;
            
            localStorage.setItem('token', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // If refresh token fails, logout user
            this.handleLogout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(credentials) {
    const response = await this.axiosInstance.post(
      `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.ENDPOINTS.LOGIN}`,
      credentials
    );
    this.setTokens(response.data);
    return response.data;
  }

  async register(userData) {
    const response = await this.axiosInstance.post(
      `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.ENDPOINTS.REGISTER}`,
      userData
    );
    return response.data;
  }

  async logout() {
    try {
      await this.axiosInstance.post(
        `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.ENDPOINTS.LOGOUT}`
      );
    } finally {
      this.handleLogout();
    }
  }

  async refreshToken(refreshToken) {
    return this.axiosInstance.post(
      `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.ENDPOINTS.REFRESH_TOKEN}`,
      { refreshToken }
    );
  }

  // Helper methods
  setTokens(data) {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  // Generic request methods
  async get(url, config = {}) {
    return this.axiosInstance.get(url, config);
  }

  async post(url, data = {}, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }

  async put(url, data = {}, config = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  async delete(url, config = {}) {
    return this.axiosInstance.delete(url, config);
  }
}

export default new ApiService(); 