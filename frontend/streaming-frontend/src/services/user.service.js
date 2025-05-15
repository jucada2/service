git pu// services/userService.js
import apiService from './api.service';
import API_CONFIG from '../config/api.config';

class UserService {
  // Crear un nuevo usuario
  async createUser(userData) {
    try {
      const response = await apiService.post(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.CREATE_USER}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener todos los usuarios
  async getUsers() {
    try {
      const response = await apiService.get(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.GET_USERS}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener un usuario por ID
  async getUserById(userId) {
    try {
      const response = await apiService.get(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.GET_USER_BY_ID}/${userId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Actualizar un usuario
  async updateUser(userId, userData) {
    try {
      const response = await apiService.patch(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.UPDATE_USER}/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Eliminar un usuario
  async deleteUser(userId) {
    try {
      const response = await apiService.delete(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.DELETE_USER}/${userId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Agregar un video a favoritos
  async addFavorite(favoriteData) {
    try {
      const response = await apiService.post(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.ADD_FAVORITE}`,
        favoriteData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Eliminar un video de favoritos
  async deleteFavorite(videoId) {
    try {
      const response = await apiService.delete(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.DELETE_FAVORITE}/${videoId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener favoritos de un usuario
  async getFavorites(userId) {
    try {
      const response = await apiService.get(
        `${API_CONFIG.USER_SERVICE.BASE_URL}${API_CONFIG.USER_SERVICE.ENDPOINTS.GET_FAVORITES}/${userId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Manejar errores
  handleError(error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        message: data.message || 'An error occurred',
        status,
        data
      };
    } else if (error.request) {
      return { message: 'No response from server', status: 0 };
    } else {
      return { message: error.message || 'An error occurred', status: 0 };
    }
  }
}

export default new UserService();
