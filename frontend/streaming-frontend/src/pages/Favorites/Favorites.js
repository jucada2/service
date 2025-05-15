import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/userService';  // Importar el servicio de usuario
import './Favorites.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = 1;  // Suponiendo que tienes el ID del usuario, cámbialo según el usuario autenticado

  useEffect(() => {
    // Obtener los favoritos del usuario desde la API
    const fetchFavorites = async () => {
      try {
        const favoritesData = await UserService.getFavorites(userId); // Obtener los favoritos usando el servicio
        setFavorites(favoritesData);  // Guardar los favoritos en el estado
      } catch (error) {
        console.error('Error al obtener los favoritos:', error);
      }
    };

    fetchFavorites();
  }, [userId]); // Re-fetch cuando cambie el userId (por ejemplo, cuando el usuario inicie sesión)

  const handleRemoveFromFavorites = async (videoId) => {
    // Eliminar un video de los favoritos usando el servicio
    try {
      await UserService.deleteFavorite(videoId);  // Llamada a la API para eliminar el favorito
      setFavorites(favorites.filter(video => video.id !== videoId));  // Actualizar el estado eliminando el video
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
    }
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Mis Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>No tienes videos favoritos aún.</p>
          <Link to="/" className="browse-button">
            Explorar Contenido
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(video => (
            <div key={video.id} className="favorite-card">
              <Link to={`/watch/${video.id}`} className="video-link">
                <div className="thumbnail-container">
                  <img src={video.thumbnail} alt={video.title} />
                  <span className="duration">{video.duration}</span>
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <span className="rating">★ {video.rating}</span>
                </div>
              </Link>
              <button
                className="remove-button"
                onClick={() => handleRemoveFromFavorites(video.id)}
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;



/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Fight Club",
      description: "Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino.",
      thumbnail: "/images/films/drama/fight-club/small.jpg",
      category: "Drama"
    },
    {
      id: 2,
      title: "The King's Speech",
      description: "La historia del rey Jorge VI y su lucha contra la tartamudez.",
      thumbnail: "/images/films/drama/kings-speech/small.jpg",
      category: "Drama"
    },
    {
      id: 3,
      title: "The Prestige",
      description: "Dos magos rivales en la Inglaterra victoriana.",
      thumbnail: "/images/films/drama/the-prestige/small.jpg",
      category: "Drama"
    }
  ]);

  useEffect(() => {
    // TODO: Fetch favorites from API
    // This is mock data for now
    setFavorites([
      {
        id: 1,
        title: "Favorite Video 1",
        thumbnail: "/assets/thumbnails/video-1.jpg",
        duration: "2:30:00",
        rating: 4.5
      },
      {
        id: 2,
        title: "Favorite Video 2",
        thumbnail: "/assets/thumbnails/video-2.jpg",
        duration: "1:45:00",
        rating: 4.0
      },
      {
        id: 3,
        title: "Favorite Video 3",
        thumbnail: "/assets/thumbnails/video-3.jpg",
        duration: "3:15:00",
        rating: 4.8
      }
    ]);
  }, []);

  const removeFromFavorites = async (videoId) => {
    // TODO: Implement remove from favorites API call
    setFavorites(favorites.filter(video => video.id !== videoId));
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Mis Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>No tienes videos favoritos aún.</p>
          <Link to="/" className="browse-button">
            Explorar Contenido
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(video => (
            <div key={video.id} className="favorite-card">
              <Link to={`/watch/${video.id}`} className="video-link">
                <div className="thumbnail-container">
                  <img src={video.thumbnail} alt={video.title} />
                  <span className="duration">{video.duration}</span>
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <span className="rating">★ {video.rating}</span>
                </div>
              </Link>
              <button
                className="remove-button"
                onClick={() => removeFromFavorites(video.id)}
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; */