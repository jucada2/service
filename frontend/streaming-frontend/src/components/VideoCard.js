import React from "react";
import "../styles/VideoCard.scss";

function VideoCard({ title, imageUrl, onClick }) {
  return (
    <div className="video-card" onClick={onClick}>
      <img src={imageUrl} alt={title} />
      <div className="video-title">{title}</div>
    </div>
  );
}

export default VideoCard;
