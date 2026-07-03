package com.ott.platform.model;

import java.util.List;

public class Movie {
    private String id;
    private String title;
    private String type; // "movie" or "show"
    private double rating;
    private String duration;
    private int releaseYear;
    private List<String> genres;
    private List<String> cast;
    private String description;
    private String posterUrl;
    private String backdropUrl;
    private String trailerUrl; // Embedded YouTube URL or code
    private boolean featured;
    private boolean trending;
    private boolean popular;

    // Constructors
    public Movie() {}

    public Movie(String id, String title, String type, double rating, String duration, int releaseYear,
                 List<String> genres, List<String> cast, String description, String posterUrl,
                 String backdropUrl, String trailerUrl, boolean featured, boolean trending, boolean popular) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.rating = rating;
        this.duration = duration;
        this.releaseYear = releaseYear;
        this.genres = genres;
        this.cast = cast;
        this.description = description;
        this.posterUrl = posterUrl;
        this.backdropUrl = backdropUrl;
        this.trailerUrl = trailerUrl;
        this.featured = featured;
        this.trending = trending;
        this.popular = popular;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getBackdropUrl() {
        return backdropUrl;
    }

    public void setBackdropUrl(String backdropUrl) {
        this.backdropUrl = backdropUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public boolean isTrending() {
        return trending;
    }

    public void setTrending(boolean trending) {
        this.trending = trending;
    }

    public boolean isPopular() {
        return popular;
    }

    public void setPopular(boolean popular) {
        this.popular = popular;
    }
}
