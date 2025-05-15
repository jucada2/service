import React from "react";
import Slider from "react-slick";
import VideoCard from "./VideoCard";
import "../styles/VideoSlider.scss";

function VideoSlider({ title, videos }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="video-slider">
      <h3>{title}</h3>
      <Slider {...settings}>
        {videos.map((video) => (
          <VideoCard
            key={video.video_id}
            title={video.title}
            imageUrl={video.thumbnailUrl}
            onClick={() => (window.location.href = `/watch/${video.video_id}`)}
          />
        ))}
      </Slider>
    </div>
  );
}

export default VideoSlider;
