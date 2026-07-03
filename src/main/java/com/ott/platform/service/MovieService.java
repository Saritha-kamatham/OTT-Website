package com.ott.platform.service;

import com.ott.platform.model.Movie;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {
    private final List<Movie> movies = new ArrayList<>();

    public MovieService() {
        initMockData();
    }

    private void initMockData() {
        // --- 1. FEATURED SCI-FI / ACTION BLOCKBUSTER ---
        movies.add(new Movie(
            "1",
            "Nebula Odyssey",
            "movie",
            9.2,
            "2h 35m",
            2025,
            Arrays.asList("Sci-Fi", "Action", "Adventure"),
            Arrays.asList("Marcus Vance", "Elena Rostova", "Kaelen Drake"),
            "In the deep reaches of the Andromeda galaxy, a stellar explorer discovers an ancient, sleeping cosmic entity that holds the key to saving a dying Earth—or destroying it instantly.",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder trailer (Rickroll/classic)
            true,  // featured
            true,  // trending
            true   // popular
        ));

        // --- 2. TRENDING ACTION MOVIE ---
        movies.add(new Movie(
            "2",
            "Shadow Grid",
            "movie",
            8.6,
            "2h 10m",
            2026,
            Arrays.asList("Action", "Thriller", "Sci-Fi"),
            Arrays.asList("Jin-Woo Park", "Sarah Connor", "Vikram Singh"),
            "In a cyberpunk metropolis controlled by an omnipotent neural network, an outlaw decker is recruited to execute the ultimate data heist—stealing the collective memory of the city.",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            true
        ));

        // --- 3. DENSE SCI-FI THRILLER ---
        movies.add(new Movie(
            "3",
            "Chronos Project",
            "movie",
            8.9,
            "1h 55m",
            2024,
            Arrays.asList("Sci-Fi", "Thriller"),
            Arrays.asList("David Miller", "Zoe Saldana", "Idris Elba"),
            "When a team of quantum physicists successfully opens a micro-wormhole to the previous day, they receive a desperate warning from their future selves about a catastrophic loop.",
            "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            false
        ));

        // --- 4. POPULAR DRAMA ---
        movies.add(new Movie(
            "4",
            "Whispers of Autumn",
            "movie",
            8.4,
            "2h 05m",
            2023,
            Arrays.asList("Drama", "Romance"),
            Arrays.asList("Emma Stone", "Ryan Gosling", "Meryl Streep"),
            "An aging painter in New England rediscovers her passion for life and art when an eccentric young novelist rents her garden cottage for the winter.",
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            true
        ));

        // --- 5. POPULAR COMEDY ---
        movies.add(new Movie(
            "5",
            "The Great Heist of Room 404",
            "movie",
            7.8,
            "1h 42m",
            2024,
            Arrays.asList("Comedy", "Action"),
            Arrays.asList("Jack Black", "Awkwafina", "Kevin Hart"),
            "Three low-level tech support workers inadvertently hijack a high-stakes cryptocurrency transfer and must outrun the FBI, the local mob, and their angry boss.",
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            true
        ));

        // --- 6. SCI-FI / ACTION SERIES (FEATURED BANNERS & POPULAR SHOW) ---
        movies.add(new Movie(
            "6",
            "Apex Hunters",
            "show",
            9.0,
            "3 Seasons",
            2023,
            Arrays.asList("Action", "Sci-Fi", "Drama"),
            Arrays.asList("Pedro Pascal", "Zendaya", "Karl Urban"),
            "In a post-apocalyptic wasteland where bio-engineered behemoths rule the surface, a veteran tracker and an orphaned girl search for a mythical underground sanctuary.",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            true, // featured
            true, // trending
            true  // popular
        ));

        // --- 7. DENSE HORROR MYSTERY ---
        movies.add(new Movie(
            "7",
            "The Fog of Blackwood",
            "movie",
            8.1,
            "1h 50m",
            2025,
            Arrays.asList("Horror", "Mystery", "Thriller"),
            Arrays.asList("Florence Pugh", "Lupita Nyong'o", "Bill Skarsgård"),
            "A structural engineer investigating a historic dam in a remote forest discovers that the thick fog rising from the reservoir brings long-buried ghosts to life.",
            "https://images.unsplash.com/photo-1505635339340-3614efe4e697?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            false
        ));

        // --- 8. DRAMA SERIES ---
        movies.add(new Movie(
            "8",
            "Crown & Glass",
            "show",
            8.8,
            "5 Seasons",
            2021,
            Arrays.asList("Drama", "History"),
            Arrays.asList("Olivia Colman", "Hugh Grant", "Gillian Anderson"),
            "An inside, sprawling look at the high-stakes political intrigue, romantic affairs, and dramatic betrayals inside a 19th-century European royal court.",
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            true
        ));

        // --- 9. SCI-FI / ANIME ACTION ---
        movies.add(new Movie(
            "9",
            "Cyber-Punk: Redline",
            "show",
            8.7,
            "2 Seasons",
            2024,
            Arrays.asList("Sci-Fi", "Action", "Animation"),
            Arrays.asList("Johnny Yong Bosch", "Cherami Leigh", "Keanu Reeves"),
            "A street-kid trying to survive in a technology-obsessed city of the future becomes a 'cyberpunk'—a mercenary outlaw known as a Redliner.",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            true
        ));

        // --- 10. THRILLER / MYSTERY ---
        movies.add(new Movie(
            "10",
            "Echoes of Silence",
            "movie",
            8.3,
            "2h 15m",
            2024,
            Arrays.asList("Thriller", "Mystery"),
            Arrays.asList("Emily Blunt", "Jake Gyllenhaal", "Cillian Murphy"),
            "A deaf investigator unravels a massive corporate conspiracy after witnessing a break-in at a high-security research facility in Geneva.",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            true
        ));

        // --- 11. COMEDY SERIES ---
        movies.add(new Movie(
            "11",
            "Office Slackers",
            "show",
            7.9,
            "4 Seasons",
            2022,
            Arrays.asList("Comedy"),
            Arrays.asList("Steve Carell", "John Krasinski", "Rainn Wilson"),
            "Follow the hilariously mundane daily struggles, practical jokes, and awkward encounters of a group of office workers at a regional paper company.",
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            true
        ));

        // --- 12. HORROR SERIES ---
        movies.add(new Movie(
            "12",
            "Haunting of Crimson Manor",
            "show",
            8.9,
            "1 Season",
            2023,
            Arrays.asList("Horror", "Drama", "Mystery"),
            Arrays.asList("Victoria Pedretti", "Michiel Huisman", "Carla Gugino"),
            "Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.",
            "https://images.unsplash.com/photo-1505635339340-3614efe4e697?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            false
        ));

        // --- 13. THRILLER / ACTION ---
        movies.add(new Movie(
            "13",
            "Apex Extraction",
            "movie",
            8.0,
            "1h 58m",
            2026,
            Arrays.asList("Action", "Thriller"),
            Arrays.asList("Chris Hemsworth", "David Harbour", "Golshifteh Farahani"),
            "A fearless black-market mercenary embarks on the most deadly mission of his career: rescuing the kidnapped son of an imprisoned international crime lord.",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            true
        ));

        // --- 14. ROMANCE / DRAMA ---
        movies.add(new Movie(
            "14",
            "Love in the Digital Age",
            "movie",
            7.6,
            "1h 48m",
            2024,
            Arrays.asList("Romance", "Comedy", "Drama"),
            Arrays.asList("Timothée Chalamet", "Saoirse Ronan", "Laura Dern"),
            "Two software engineers working on rival dating algorithms find themselves falling in love offline, while their respective programs declare them completely incompatible.",
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            false
        ));

        // --- 15. SCI-FI / ADVENTURE SERIES ---
        movies.add(new Movie(
            "15",
            "The Void Walkers",
            "show",
            9.1,
            "4 Seasons",
            2022,
            Arrays.asList("Sci-Fi", "Adventure", "Thriller"),
            Arrays.asList("David Tennant", "Jodie Whittaker", "Benedict Cumberbatch"),
            "A secret branch of space explorers use experimental warp gates to jump between parallel universes, seeking resources to rebuild their ruined timeline.",
            "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            true,  // featured
            false,
            true
        ));

        // --- 16. DRAMA THRILLER MOVIE ---
        movies.add(new Movie(
            "16",
            "Shattered Mirror",
            "movie",
            8.2,
            "2h 12m",
            2023,
            Arrays.asList("Drama", "Thriller", "Mystery"),
            Arrays.asList("Natalie Portman", "Mila Kunis", "Vincent Cassel"),
            "A talented but obsessive ballet dancer begins to lose her grip on reality as competition with a newcomer intensifies before a major opening performance.",
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            true
        ));

        // --- 17. COMEDY MOVIE ---
        movies.add(new Movie(
            "17",
            "Bad Agents",
            "movie",
            7.5,
            "1h 38m",
            2025,
            Arrays.asList("Comedy", "Action"),
            Arrays.asList("Ryan Reynolds", "Will Ferrell", "Sandra Bullock"),
            "Two inept estate agents accidentally list a secure government CIA safehouse for rent, leading to a hilarious struggle when rogue operatives move in.",
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            false
        ));

        // --- 18. ROMANCE SERIES ---
        movies.add(new Movie(
            "18",
            "Seoul Mate",
            "show",
            8.5,
            "1 Season",
            2025,
            Arrays.asList("Romance", "Comedy", "Drama"),
            Arrays.asList("Park Seo-joon", "Han So-hee", "Wi Ha-joon"),
            "A world-renowned food critic loses his sense of taste, only to discover he can taste foods prepared by an aspiring street-food chef in Seoul.",
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            true
        ));

        // --- 19. HORROR THRILLER MOVIE ---
        movies.add(new Movie(
            "19",
            "Silent Cabin",
            "movie",
            7.7,
            "1h 44m",
            2024,
            Arrays.asList("Horror", "Thriller"),
            Arrays.asList("Lupita Nyong'o", "Winston Duke", "Elisabeth Moss"),
            "A family vacationing in a remote mountain cabin discovers that they must remain absolutely silent to avoid attracting a subterranean predatory threat.",
            "https://images.unsplash.com/photo-1505635339340-3614efe4e697?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            false,
            true
        ));

        // --- 20. DOCUMENTARY SERIES ---
        movies.add(new Movie(
            "20",
            "Our Wild Horizon",
            "show",
            9.3,
            "2 Seasons",
            2024,
            Arrays.asList("Documentary", "Adventure"),
            Arrays.asList("David Attenborough", "Sigourney Weaver"),
            "A breathtaking look at Earth's most remote, extreme wildernesses and the resilient species that survive in the face of rapid ecological change.",
            "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&auto=format&fit=crop&q=80",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            false,
            true,
            true
        ));
    }

    public List<Movie> getAll() {
        return movies;
    }

    public Optional<Movie> getById(String id) {
        return movies.stream().filter(m -> m.getId().equals(id)).findFirst();
    }

    public List<Movie> search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return movies;
        }
        String lowerQuery = query.toLowerCase().trim();
        return movies.stream()
                .filter(m -> m.getTitle().toLowerCase().contains(lowerQuery) ||
                        m.getDescription().toLowerCase().contains(lowerQuery) ||
                        m.getGenres().stream().anyMatch(g -> g.toLowerCase().contains(lowerQuery)) ||
                        m.getCast().stream().anyMatch(c -> c.toLowerCase().contains(lowerQuery)))
                .collect(Collectors.toList());
    }

    public List<Movie> getFeatured() {
        return movies.stream().filter(Movie::isFeatured).collect(Collectors.toList());
    }

    public List<Movie> getTrending() {
        return movies.stream().filter(Movie::isTrending).collect(Collectors.toList());
    }

    public List<Movie> getPopular() {
        return movies.stream().filter(Movie::isPopular).collect(Collectors.toList());
    }

    public List<Movie> getByType(String type) {
        return movies.stream()
                .filter(m -> m.getType().equalsIgnoreCase(type))
                .collect(Collectors.toList());
    }

    public List<Movie> getByGenre(String genre) {
        return movies.stream()
                .filter(m -> m.getGenres().stream().anyMatch(g -> g.equalsIgnoreCase(genre)))
                .collect(Collectors.toList());
    }

    public List<String> getAllGenres() {
        return movies.stream()
                .flatMap(m -> m.getGenres().stream())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
