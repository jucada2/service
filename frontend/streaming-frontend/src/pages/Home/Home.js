import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ContentService from '../../services/contentService';  // Importa el ContentService
import './Home.scss';

const Home = () => {
  const [featuredContent, setFeaturedContent] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener contenido destacado y categorías desde la API usando ContentService
    const fetchData = async () => {
      try {
        // Obtener contenido destacado (puedes ajustar esto según tu API)
        const featured = await ContentService.getVideoById(1);  // Ejemplo: Obtener el primer video destacado
        setFeaturedContent(featured);

        // Obtener categorías de contenido (como Drama, Romance, Suspense)
        const genres = ["Drama", "Romance", "Suspense"];  // Los géneros son solo un ejemplo
        const categoryPromises = genres.map(async (genre) => {
          const videos = await ContentService.getVideosByGenre(genre);
          return { title: genre, videos };
        });

        const categoriesData = await Promise.all(categoryPromises);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener el contenido:', error);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  if (!featuredContent || categories.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>{featuredContent.title}</h1>
          <p>{featuredContent.description}</p>
          <div className="hero-buttons">
            <Link to={`/watch/${featuredContent.id}`} className="play-button">
              <i className="fas fa-play"></i> Reproducir
            </Link>
            <button className="more-info-button">
              <i className="fas fa-info-circle"></i> Más Información
            </button>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <img src={featuredContent.image} alt={featuredContent.title} className="hero-image" />
      </div>

      {/* Category Rows */}
      {categories.map(category => (
        <div key={category.title} className="category-row">
          <h2 className="category-title">{category.title}</h2>
          <Slider {...sliderSettings} className="content-slider">
            {category.videos.map(item => (
              <div key={item.id} className="content-item">
                <Link to={`/watch/${item.id}`}>
                  <div className="content-card">
                    <img src={item.image} alt={item.title} />
                    <div className="content-overlay">
                      <div className="content-info">
                        <h3>{item.title}</h3>
                        <p className="content-description">{item.description}</p>
                        <div className="content-actions">
                          <button className="play-button-small">
                            <i className="fas fa-play"></i>
                          </button>
                          <button className="add-button">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default Home;
