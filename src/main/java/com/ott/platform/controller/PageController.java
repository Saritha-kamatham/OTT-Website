package com.ott.platform.controller;

import com.ott.platform.model.Movie;
import com.ott.platform.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Controller
public class PageController {

    private final MovieService movieService;

    @Autowired
    public PageController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("activePage", "home");
        return "home";
    }

    @GetMapping("/movies")
    public String movies(Model model) {
        model.addAttribute("activePage", "movies");
        return "movies";
    }

    @GetMapping("/tv-shows")
    public String tvShows(Model model) {
        model.addAttribute("activePage", "tvshows");
        return "tvshows";
    }

    @GetMapping("/categories")
    public String categories(Model model) {
        model.addAttribute("activePage", "categories");
        return "categories";
    }

    @GetMapping("/search")
    public String search(Model model) {
        model.addAttribute("activePage", "search");
        return "search";
    }

    @GetMapping("/my-list")
    public String myList(Model model) {
        model.addAttribute("activePage", "mylist");
        return "mylist";
    }

    @GetMapping("/details/{id}")
    public String details(@PathVariable String id, Model model) {
        Optional<Movie> movie = movieService.getById(id);
        if (movie.isPresent()) {
            model.addAttribute("movie", movie.get());
            model.addAttribute("activePage", "details");
            return "details";
        }
        return "redirect:/"; // Redirect to home if movie not found
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("activePage", "about");
        return "about";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("activePage", "contact");
        return "contact";
    }
}
