package com.example.videos.service;

import com.example.videos.model.Video;
import com.example.videos.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video addVideo(Video video) {
        return videoRepository.save(video);
    }

    public Optional<Video> getVideo(Long id) {
        return videoRepository.findById(id);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }

    public List<Video> getVideosByGenre(String genre) {
        return videoRepository.findByGenreIgnoreCase(genre);
    }

    public List<Video> searchVideos(String title, String genre, String keyword) {
        return videoRepository.searchVideos(title, genre, keyword);
    }
}
