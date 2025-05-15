import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Watch.scss';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState({
    id: id,
    title: "Fight Club",
    description: "Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino.",
    videoUrl: "/videos/bunny.mp4",
    thumbnail: "/images/films/drama/fight-club/small.jpg",
    category: "Drama"
  });

  const [relatedVideos, setRelatedVideos] = useState([
    { 
      id: 1, 
      title: "The King's Speech", 
      thumbnail: "/images/films/drama/kings-speech/small.jpg" 
    },
    { 
      id: 2, 
      title: "The Prestige", 
      thumbnail: "/images/films/drama/the-prestige/small.jpg" 
    },
    { 
      id: 3, 
      title: "The Revenant", 
      thumbnail: "/images/films/drama/the-revenant/small.jpg" 
    }
  ]);

  useEffect(() => {
    // TODO: Fetch video details and related videos from API
    // This is mock data for now
    setVideo({
      id: id,
      title: "Video Title",
      description: "This is a detailed description of the video content.",
      videoUrl: "/assets/sample-video.mp4",
      thumbnail: "/assets/thumbnails/video-1.jpg",
      duration: "2:30:00",
      rating: 4.5,
      genre: "Action",
      year: 2024
    });

    setRelatedVideos([
      { id: 1, title: "Related Video 1", thumbnail: "/assets/thumbnails/video-2.jpg" },
      { id: 2, title: "Related Video 2", thumbnail: "/assets/thumbnails/video-3.jpg" },
      { id: 3, title: "Related Video 3", thumbnail: "/assets/thumbnails/video-4.jpg" }
    ]);
  }, [id]);

  if (!video) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="watch-page">
      <div className="video-container">
        <video
          className="video-player"
          controls
          poster={video.thumbnail}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="video-info">
        <h1>{video.title}</h1>
        <div className="video-meta">
          <span className="year">{video.year}</span>
          <span className="duration">{video.duration}</span>
          <span className="rating">★ {video.rating}</span>
          <span className="genre">{video.genre}</span>
        </div>
        <p className="description">{video.description}</p>
      </div>

      <div className="related-videos">
        <h2>Contenido Relacionado</h2>
        <div className="related-videos-grid">
          {relatedVideos.map(relatedVideo => (
            <div key={relatedVideo.id} className="related-video-card">
              <img src={relatedVideo.thumbnail} alt={relatedVideo.title} />
              <h3>{relatedVideo.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch; 