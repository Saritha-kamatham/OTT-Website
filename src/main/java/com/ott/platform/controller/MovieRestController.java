package com.ott.platform.controller;

import com.ott.platform.model.Movie;
import com.ott.platform.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*") // Allow frontend to fetch data easily if needed
public class MovieRestController {

    private final MovieService movieService;

    @Autowired
    public MovieRestController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable String id) {
        return movieService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam(value = "q", required = false) String query) {
        return ResponseEntity.ok(movieService.search(query));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Movie>> getFeatured() {
        return ResponseEntity.ok(movieService.getFeatured());
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Movie>> getTrending() {
        return ResponseEntity.ok(movieService.getTrending());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Movie>> getPopular() {
        return ResponseEntity.ok(movieService.getPopular());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Movie>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(movieService.getByType(type));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(movieService.getByGenre(genre));
    }

    @GetMapping("/genres")
    public ResponseEntity<List<String>> getAllGenres() {
        return ResponseEntity.ok(movieService.getAllGenres());
    }
}
