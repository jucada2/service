package com.example.videos.controller;
import com.example.videos.model.VideoRating;
import com.example.videos.service.VideoRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/rating")
public class VideoRatingController {
    @Autowired
    private VideoRatingService videoRatingService;
    @PostMapping
    public VideoRating addRating(@RequestBody VideoRating videoRating) {
        return videoRatingService.addRating(videoRating);
    }
    @GetMapping("/{videoId}")
    public ResponseEntity<List<VideoRating>> getRatings(@PathVariable Long videoId) {
        List<VideoRating> ratings = videoRatingService.getRatingsByVideoId(videoId);
        return ResponseEntity.ok(ratings);
    }
}