package com.example.videos.repository;

import com.example.videos.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByGenreIgnoreCase(String genre);

    // Nuevo método para búsqueda combinada por título, género o palabras clave
    @Query("SELECT v FROM Video v LEFT JOIN v.keywords k " +
           "WHERE (:title IS NULL OR LOWER(v.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
           "OR (:genre IS NULL OR LOWER(v.genre) = LOWER(:genre)) " +
           "OR (:keyword IS NULL OR LOWER(k) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Video> searchVideos(@Param("title") String title,
                             @Param("genre") String genre,
                             @Param("keyword") String keyword);
}