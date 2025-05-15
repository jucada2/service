// services/historialService.js
import apiService from './api.service';  

class HistorialService {
  // Agregar un video al historial
  async addToHistorial(userId, videoId) {
    try {
      const response = await apiService.post('/historial', {
        user_id: userId,
        video_id: videoId,
      });
      return response.data;
    } catch (error) {
      console.error('Error al agregar al historial:', error);
    }
  }

  // Obtener el historial de un usuario
  async getHistorial(userId) {
    try {
      const response = await apiService.get('/historial', {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  }

  // Eliminar todo el historial de un usuario
  async clearHistorial(userId) {
    try {
      const response = await apiService.delete('/historial', {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el historial:', error);
    }
  }

  // Eliminar un video específico del historial
  async removeFromHistorial(userId, videoId) {
    try {
      const response = await apiService.put(`/historial/${videoId}`, {
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el video del historial:', error);
    }
  }
}

export default new HistorialService();
