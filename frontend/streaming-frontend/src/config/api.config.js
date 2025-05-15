const API_CONFIG = {
  // Auth Service
  AUTH_SERVICE: {
    BASE_URL: process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001',
    ENDPOINTS: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      VERIFY_TOKEN: '/auth/verify-token'
    }
  },

  // Content Service
  CONTENT_SERVICE: {
    BASE_URL: process.env.REACT_APP_CONTENT_SERVICE_URL || 'http://localhost:8080',
    ENDPOINTS: {
      MOVIES: '/api/movies',
      SERIES: '/api/series',
      CATEGORIES: '/api/categories',
      SEARCH: '/api/search'
    }
  },

  // User Service
  USER_SERVICE: {
    BASE_URL: "http://localhost:8001/api/users",  // falta link del balanceador de carga reemplazar :p,
    //  8001 porque en user está expuesto en docker-compose
    ENDPOINTS: {
      CREATE_USER: "/user", 
      GET_USERS: "/users",  
      GET_USER_BY_ID: "/user", 
      UPDATE_USER: "/user",
      DELETE_USER: "/user",
      ADD_FAVORITE: "/favorite",
      DELETE_FAVORITE: "/favorite",
      GET_FAVORITES: "/favorites"
    }
  },

  
  CONTENT_SERVICE: {
      BASE_URL: "http://loadbalancer.example.com/api/content",  // URL del balanceador de carga o la URL base del servicio de contenido
      ENDPOINTS: {
        GET_ALL_VIDEOS: "/video",  // Obtener todos los videos
        GET_VIDEO_BY_ID: "/video",  // Obtener video por ID
        GET_VIDEOS_BY_GENRE: "/video/genre",  // Obtener videos por género
        SEARCH_VIDEOS: "/video/search",  // Buscar videos
        ADD_RATING: "/rating",  // Agregar calificación
        GET_RATINGS_BY_VIDEO_ID: "/rating"  // Obtener calificaciones por ID de video
      }
    },

  // Payment Service
  PAYMENT_SERVICE: {
    BASE_URL: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:3004',
    ENDPOINTS: {
      SUBSCRIPTIONS: '/payments/subscriptions',
      PLANS: '/payments/plans',
      TRANSACTIONS: '/payments/transactions'
    }
  },

  // History Service
  HISTORIAL_SERVICE: {
    BASE_URL: "http://localhost:5000/api",  //balanceador
    ENDPOINTS: {
      GET_HISTORIAL: "/historial",  // Obtener historial de un usuario
      ADD_HISTORIAL: "/historial",  // Agregar un video al historial
      CLEAR_HISTORIAL: "/historial",  // Limpiar historial de un usuario
      REMOVE_VIDEO_FROM_HISTORIAL: "/historial"  // Eliminar un video específico del historial
    }
  }
};

export default API_CONFIG; 