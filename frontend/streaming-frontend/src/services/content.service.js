import apiService from './api.service';  
import API_CONFIG from '../config/api.config';  

class ContentService {
  // Obtener todos los videos
  async getAllVideos() {
    try {
      const response = await apiService.get(`${API_CONFIG.CONTENT_SERVICE.BASE_URL}${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.GET_ALL_VIDEOS}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener un video por ID
  async getVideoById(videoId) {
    try {
      const response = await apiService.get(`${API_CONFIG.CONTENT_SERVICE.BASE_URL}${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.GET_VIDEO_BY_ID}/${videoId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener videos por género
  async getVideosByGenre(genre) {
    try {
      const response = await apiService.get(`${API_CONFIG.CONTENT_SERVICE.BASE_URL}${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.GET_VIDEOS_BY_GENRE}/${genre}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar videos por título, género o palabra clave
  async searchVideos({ title, genre, keyword }) {
    try {
      const response = await apiService.get(`${API_CONFIG.CONTENT_SERVICE.BASE_URL}${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.SEARCH_VIDEOS}`, {
        params: { title, genre, keyword }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Agregar una calificación a un video
  async addRating(videoId, rating) {
    try {
      const response = await apiService.post(`${API_CONFIG.CONTENT_SERVICE.BASE_URL}${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.ADD_RATING}`, { videoId, rating });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener las calificaciones de un video
  async getRatingsByVideoId(videoId) {
    try {
      const response = await apiService.get(`${API_CONFIG.CONTENT_SERVICE.BASE_URL}${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.GET_RATINGS_BY_VIDEO_ID}/${videoId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Manejo de errores
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

export default new ContentService();
