package com.example.videos.service;
import com.example.videos.model.VideoRating;
import com.example.videos.repository.VideoRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class VideoRatingService {
    @Autowired
    private VideoRatingRepository videoRatingRepository;
    public VideoRating addRating(VideoRating videoRating) {
        return videoRatingRepository.save(videoRating);
    }
    public List<VideoRating> getRatingsByVideoId(Long videoId) {
        return videoRatingRepository.findByVideoId(videoId);
    }
}
