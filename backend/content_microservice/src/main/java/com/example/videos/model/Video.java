package com.example.videos.model;

import jakarta.persistence.*; // JPA
import java.util.List;

@Entity
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String genre;

    @ElementCollection
    private List<String> keywords;

    private String url;

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getGenre() {
        return genre;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public String getUrl() {
        return url;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}