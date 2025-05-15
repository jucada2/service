package com.example.videos.controller;
import com.example.videos.model.Video;
import com.example.videos.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping
    public Video addVideo(@RequestBody Video video) {
        return videoService.addVideo(video);
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Content service is healthy");
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideo(@PathVariable Long id) {
        return videoService.getVideo(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Video> getAll() {
        return videoService.getAllVideos();
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
    }

    @GetMapping("/genre/{genre}")
    public List<Video> getByGenre(@PathVariable String genre) {
        return videoService.getVideosByGenre(genre);
    }

    // Nuevo endpoint para búsqueda
    @GetMapping("/search")
    public List<Video> searchVideos(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String keyword) {
        return videoService.searchVideos(title, genre, keyword);
    }
}
