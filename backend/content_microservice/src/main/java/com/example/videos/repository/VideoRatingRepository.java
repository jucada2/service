package com.example.videos.repository;
import com.example.videos.model.VideoRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface VideoRatingRepository extends JpaRepository<VideoRating, Long> {
    List<VideoRating> findByVideoId(Long videoId);
}
