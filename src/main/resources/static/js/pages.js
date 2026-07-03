/* -------------------------------------------------------------
   CineStream Page-Specific Renderer Logic
   ------------------------------------------------------------- */

// Helper to create movie card HTML markup
function createMovieCardHTML(movie) {
    const isWishlisted = window.Watchlist.has(movie.id);
    const watchlistIcon = isWishlisted ? 'fa-solid fa-check' : 'fa-solid fa-plus';
    const watchlistText = isWishlisted ? 'In List' : 'My List';

    return `
        <div class="movie-card" data-id="${movie.id}">
            <img src="${movie.posterUrl}" alt="${movie.title}" class="card-poster" loading="lazy">
            <div class="card-info">
                <h3 class="card-title">${movie.title}</h3>
                <div class="card-meta">
                    <span class="card-rating">
                        <i class="fa-solid fa-star"></i> ${movie.rating.toFixed(1)}
                    </span>
                    <span>${movie.duration}</span>
                </div>
                <div class="card-btns">
                    <button class="card-btn card-btn-play" onclick="playMovieTrailer('${movie.trailerUrl}', '${movie.id}')">
                        <i class="fa-solid fa-play"></i> Play
                    </button>
                    <button class="card-btn card-btn-add" onclick="toggleWatchlistCard('${movie.id}', this)">
                        <i class="${watchlistIcon}"></i> ${watchlistText}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Global action handler for card watchlist toggle
window.toggleWatchlistCard = function(id, btnElement) {
    const isNowAdded = window.Watchlist.toggle(id);
    const icon = btnElement.querySelector('i');
    if (icon) {
        icon.className = isNowAdded ? 'fa-solid fa-check' : 'fa-solid fa-plus';
        btnElement.innerHTML = `<i class="${icon.className}"></i> ${isNowAdded ? 'In List' : 'My List'}`;
    }
};

// Global action wrapper to trigger trailer playing & track "Continue Watching" / "Recently Viewed"
window.playMovieTrailer = function(trailerUrl, id) {
    window.openTrailer(trailerUrl);
    // Add to continue watching with a simulated progress (e.g. 15% progress)
    window.ContinueWatching.save(id, Math.floor(Math.random() * 40) + 10);
    window.RecentlyViewed.add(id);
};

/* -------------------------------------------------------------
   1. HOME PAGE LOGIC
   ------------------------------------------------------------- */
async function renderHomePage() {
    try {
        // A. Load Hero Slider
        const featuredRes = await fetch('/api/movies/featured');
        const featuredItems = await featuredRes.json();
        setupHeroSlider(featuredItems);

        // B. Load Trending Carousels
        const trendingRes = await fetch('/api/movies/trending');
        const trendingItems = await trendingRes.json();
        fillCarousel('trending-rail', trendingItems);

        // C. Load Popular Movies
        const popularRes = await fetch('/api/movies/popular');
        const popularItems = await popularRes.json();
        // Filter out shows
        const popularMovies = popularItems.filter(item => item.type === 'movie');
        fillCarousel('popular-movies-rail', popularMovies);

        // D. Load Popular Shows
        const popularShows = popularItems.filter(item => item.type === 'show');
        fillCarousel('popular-shows-rail', popularShows);

        // E. Render Continue Watching Section if available
        renderContinueWatchingSection();

        // F. Render Recently Viewed Section if available
        renderRecentlyViewedSection();

    } catch (err) {
        console.error("Error loading home page content:", err);
    }
}

function setupHeroSlider(items) {
    const sliderContainer = document.getElementById('hero-slider');
    const indicatorsContainer = document.getElementById('hero-indicators');

    if (!sliderContainer || items.length === 0) return;

    // Clear loading skeleton
    sliderContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    items.forEach((movie, index) => {
        // Create slide element
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        
        slide.innerHTML = `
            <img src="${movie.backdropUrl}" alt="${movie.title}" class="hero-backdrop">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <span class="hero-badge">${movie.type === 'movie' ? 'Movie' : 'TV Series'}</span>
                <h1 class="hero-title">${movie.title}</h1>
                <div class="hero-meta">
                    <span class="hero-rating"><i class="fa-solid fa-star"></i> ${movie.rating.toFixed(1)}</span>
                    <span>${movie.releaseYear}</span>
                    <span>${movie.duration}</span>
                    <span class="hero-genres">${movie.genres.join(', ')}</span>
                </div>
                <p class="hero-desc">${movie.description}</p>
                <div class="hero-btns">
                    <button class="btn btn-primary" onclick="playMovieTrailer('${movie.trailerUrl}', '${movie.id}')">
                        <i class="fa-solid fa-play"></i> Watch Trailer
                    </button>
                    <a href="/details/${movie.id}" class="btn btn-secondary">
                        <i class="fa-solid fa-circle-info"></i> More Info
                    </a>
                </div>
            </div>
        `;
        sliderContainer.appendChild(slide);

        // Create indicator dots
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });

    // Auto Sliding Timer
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 6000);

    function nextSlide() {
        goToSlide((currentSlide + 1) % items.length);
    }

    function goToSlide(n) {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = n;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');

        // Reset timer
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }
}

function fillCarousel(railId, items) {
    const rail = document.getElementById(railId);
    if (!rail) return;

    rail.innerHTML = '';
    if (items.length === 0) {
        rail.innerHTML = '<div class="no-results" style="padding: 2rem;">No titles found.</div>';
        return;
    }

    items.forEach(movie => {
        rail.innerHTML += createMovieCardHTML(movie);
    });
}

// Render "Continue Watching" using Local Storage
async function renderContinueWatchingSection() {
    const section = document.getElementById('continue-watching-section');
    const rail = document.getElementById('continue-rail');
    if (!section || !rail) return;

    const list = window.ContinueWatching.get();
    if (list.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    rail.innerHTML = '';

    // Fetch details for each item
    for (const item of list) {
        try {
            const res = await fetch(`/api/movies/${item.id}`);
            if (res.status === 200) {
                const movie = await res.json();
                
                // Render card with progress bar
                const card = document.createElement('div');
                card.className = 'movie-card';
                card.innerHTML = `
                    <img src="${movie.posterUrl}" alt="${movie.title}" class="card-poster">
                    
                    <!-- Progress Bar Overlay -->
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 5px; background: rgba(255,255,255,0.2); z-index: 4;">
                        <div style="width: ${item.progress}%; height: 100%; background: var(--accent-red);"></div>
                    </div>

                    <div class="card-info">
                        <h3 class="card-title">${movie.title}</h3>
                        <div class="card-meta">
                            <span>Progress: ${item.progress}%</span>
                            <span class="card-rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                        </div>
                        <div class="card-btns">
                            <button class="card-btn card-btn-play" onclick="playMovieTrailer('${movie.trailerUrl}', '${movie.id}')">
                                <i class="fa-solid fa-play"></i> Resume
                            </button>
                            <button class="card-btn card-btn-add" style="font-size: 1.1rem; padding: 0.2rem 0.5rem;" onclick="removeContinueWatching('${movie.id}', this)" title="Remove progress">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                rail.appendChild(card);
            }
        } catch (e) {
            console.error("Error retrieving continue watching details:", e);
        }
    }
}

window.removeContinueWatching = function(id, btnElement) {
    window.ContinueWatching.remove(id);
    renderContinueWatchingSection();
};

// Render "Recently Viewed" using Local Storage
async function renderRecentlyViewedSection() {
    const section = document.getElementById('recently-viewed-section');
    const rail = document.getElementById('recently-viewed-rail');
    if (!section || !rail) return;

    const list = window.RecentlyViewed.get();
    if (list.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    rail.innerHTML = '';

    // Fetch details for each item
    for (const id of list) {
        try {
            const res = await fetch(`/api/movies/${id}`);
            if (res.status === 200) {
                const movie = await res.json();
                rail.innerHTML += createMovieCardHTML(movie);
            }
        } catch (e) {
            console.error("Error retrieving recently viewed details:", e);
        }
    }
}

/* -------------------------------------------------------------
   2. CATALOG PAGES LOGIC (MOVIES & TV SHOWS GRID)
   ------------------------------------------------------------- */
let catalogItems = [];
let activeGenreFilter = 'all';

async function renderCatalogPage(type, initialGenre = 'all') {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;

    activeGenreFilter = initialGenre;

    try {
        // A. Fetch Items
        const res = await fetch(`/api/movies/type/${type}`);
        catalogItems = await res.json();

        // B. Fetch Genres list to build Pills
        const genreRes = await fetch('/api/movies/genres');
        const genres = await genreRes.json();
        buildGenrePills(genres, type);

        // C. Register Sort listener
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                applyFiltersAndSorting();
            });
        }

        // D. Filter and Sort
        applyFiltersAndSorting();

    } catch (err) {
        console.error("Error loading catalog content:", err);
    }
}

function buildGenrePills(genres, type) {
    const container = document.getElementById('genres-pills-container');
    if (!container) return;

    container.innerHTML = `<button class="genre-pill ${activeGenreFilter === 'all' ? 'active' : ''}" data-genre="all">All Genres</button>`;
    
    genres.forEach(genre => {
        container.innerHTML += `<button class="genre-pill ${activeGenreFilter === genre ? 'active' : ''}" data-genre="${genre}">${genre}</button>`;
    });

    // Add click listeners to pills
    const pills = container.querySelectorAll('.genre-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeGenreFilter = pill.getAttribute('data-genre');
            applyFiltersAndSorting();
        });
    });
}

function applyFiltersAndSorting() {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;

    // Filter
    let filtered = catalogItems;
    if (activeGenreFilter !== 'all') {
        filtered = catalogItems.filter(item => 
            item.genres.some(g => g.toLowerCase() === activeGenreFilter.toLowerCase())
        );
    }

    // Sort
    const sortVal = document.getElementById('sort-select')?.value || 'year-desc';
    if (sortVal === 'rating-desc') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortVal === 'year-desc') {
        filtered.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortVal === 'year-asc') {
        filtered.sort((a, b) => a.releaseYear - b.releaseYear);
    } else if (sortVal === 'name-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Render Grid
    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-circle-question"></i>
                <h3>No Results Found</h3>
                <p>We couldn't find any matching titles for the selected genre.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(movie => {
        grid.innerHTML += createMovieCardHTML(movie);
    });
}

/* -------------------------------------------------------------
   3. SEARCH PAGE LOGIC
   ------------------------------------------------------------- */
function initSearchPage() {
    const searchInput = document.getElementById('search-input');
    const searchGrid = document.getElementById('search-grid');
    const searchInfo = document.getElementById('search-results-info');
    const countDisplay = document.getElementById('results-count');
    const queryDisplay = document.getElementById('search-query-display');

    if (!searchInput || !searchGrid) return;

    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const query = searchInput.value.trim();

        if (query.length === 0) {
            searchGrid.innerHTML = `
                <div class="no-results" id="initial-search-state">
                    <i class="fa-solid fa-film"></i>
                    <h3>Search CineStream</h3>
                    <p>Type above to search our library of movies, series, and documentaries.</p>
                </div>
            `;
            searchInfo.style.display = 'none';
            return;
        }

        // Show skeletons before fetching
        searchGrid.innerHTML = `
            <div class="skeleton skeleton-card"></div>
            <div class="skeleton skeleton-card"></div>
            <div class="skeleton skeleton-card"></div>
            <div class="skeleton skeleton-card"></div>
        `;

        debounceTimer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`);
                const items = await res.json();
                
                searchGrid.innerHTML = '';
                searchInfo.style.display = 'block';
                countDisplay.textContent = items.length;
                queryDisplay.textContent = query;

                if (items.length === 0) {
                    searchGrid.innerHTML = `
                        <div class="no-results">
                            <i class="fa-solid fa-face-frown"></i>
                            <h3>No Match Found</h3>
                            <p>We couldn't find anything matching your search term. Try another spelling or query.</p>
                        </div>
                    `;
                } else {
                    items.forEach(movie => {
                        searchGrid.innerHTML += createMovieCardHTML(movie);
                    });
                }
            } catch (err) {
                console.error("Search API retrieval error:", err);
            }
        }, 300);
    });
}

/* -------------------------------------------------------------
   4. WISHLIST PAGE LOGIC
   ------------------------------------------------------------- */
async function renderWatchlistPage() {
    const grid = document.getElementById('wishlist-grid');
    if (!grid) return;

    const list = window.Watchlist.get();
    if (list.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; padding: 5rem 2rem;">
                <i class="fa-solid fa-bookmark" style="font-size: 3.5rem; color: var(--text-muted);"></i>
                <h3 style="margin-top: 1rem;">Your List is Empty</h3>
                <p style="margin-bottom: 2rem;">Save movies and series to watch them later. They'll show up here.</p>
                <a href="/movies" class="btn btn-primary"><i class="fa-solid fa-play"></i> Browse Movies</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    for (const id of list) {
        try {
            const res = await fetch(`/api/movies/${id}`);
            if (res.status === 200) {
                const movie = await res.json();
                grid.innerHTML += createMovieCardHTML(movie);
            }
        } catch (e) {
            console.error("Watchlist item retrieval error for ID:", id, e);
        }
    }

    // Refresh page if watchlist changed
    window.addEventListener('watchlistChanged', () => {
        renderWatchlistPage();
    });
}

/* -------------------------------------------------------------
   5. MOVIE DETAILS PAGE ENRICHMENT
   ------------------------------------------------------------- */
async function initDetailsPage(id, genre) {
    // Watchlist Toggle Button
    const watchlistBtn = document.getElementById('details-watchlist-btn');
    if (watchlistBtn) {
        updateDetailsWatchlistBtn(id);

        watchlistBtn.addEventListener('click', () => {
            window.Watchlist.toggle(id);
            updateDetailsWatchlistBtn(id);
        });
    }

    // Play Trailer directly
    window.playMovieTrailer = function(trailerUrl) {
        window.openTrailer(trailerUrl);
        window.ContinueWatching.save(id, 25);
        window.RecentlyViewed.add(id);
    };

    // Load recommendations (Same genre, excluding current ID)
    try {
        const res = await fetch(`/api/movies/genre/${encodeURIComponent(genre)}`);
        const items = await res.json();
        
        const filtered = items.filter(m => m.id !== id);
        fillCarousel('recommendations-rail', filtered);
    } catch (e) {
        console.error("Error loading recommendations:", e);
    }
}

function updateDetailsWatchlistBtn(id) {
    const btn = document.getElementById('details-watchlist-btn');
    if (!btn) return;

    const inList = window.Watchlist.has(id);
    if (inList) {
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Remove from List`;
        btn.className = 'btn btn-secondary';
    } else {
        btn.innerHTML = `<i class="fa-solid fa-plus"></i> Add to List`;
        btn.className = 'btn btn-primary';
    }
}

/* -------------------------------------------------------------
   6. CONTACT PAGE LOGIC
   ------------------------------------------------------------- */
function initContactPage() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Inputs
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectSelect = document.getElementById('contact-subject');
        const messageText = document.getElementById('contact-message');

        // Errors
        const nameErr = document.getElementById('name-error');
        const emailErr = document.getElementById('email-error');
        const subjectErr = document.getElementById('subject-error');
        const messageErr = document.getElementById('message-error');

        let isValid = true;

        // Validation - Name
        if (nameInput.value.trim().length < 2) {
            nameErr.style.display = 'block';
            nameInput.style.borderColor = 'var(--accent-red)';
            isValid = false;
        } else {
            nameErr.style.display = 'none';
            nameInput.style.borderColor = '';
        }

        // Validation - Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailErr.style.display = 'block';
            emailInput.style.borderColor = 'var(--accent-red)';
            isValid = false;
        } else {
            emailErr.style.display = 'none';
            emailInput.style.borderColor = '';
        }

        // Validation - Subject
        if (!subjectSelect.value) {
            subjectErr.style.display = 'block';
            subjectSelect.style.borderColor = 'var(--accent-red)';
            isValid = false;
        } else {
            subjectErr.style.display = 'none';
            subjectSelect.style.borderColor = '';
        }

        // Validation - Message
        if (messageText.value.trim().length < 10) {
            messageErr.style.display = 'block';
            messageText.style.borderColor = 'var(--accent-red)';
            isValid = false;
        } else {
            messageErr.style.display = 'none';
            messageText.style.borderColor = '';
        }

        if (isValid) {
            submitForm(nameInput.value.trim(), emailInput.value.trim());
        }
    });
}

function submitForm(name, email) {
    const submitBtn = document.getElementById('submit-btn');
    const submitIcon = document.getElementById('submit-icon');
    const submitSpinner = document.getElementById('submit-spinner');

    if (submitBtn && submitIcon && submitSpinner) {
        // Set loading state
        submitBtn.disabled = true;
        submitIcon.style.display = 'none';
        submitSpinner.style.display = 'inline-block';
        submitBtn.style.opacity = '0.7';

        // Simulate network API transmission delay
        setTimeout(() => {
            // Restore btn
            submitBtn.disabled = false;
            submitIcon.style.display = 'inline-block';
            submitSpinner.style.display = 'none';
            submitBtn.style.opacity = '';

            // Transition Form to Success Layout
            document.getElementById('contact-form-wrapper').style.display = 'none';
            
            const successState = document.getElementById('contact-success-state');
            successState.style.display = 'block';

            document.getElementById('success-user-name').textContent = name;
            document.getElementById('success-user-email').textContent = email;

            // Clear inputs
            document.getElementById('contact-form').reset();
        }, 1500);
    }
}

window.resetContactForm = function() {
    document.getElementById('contact-form-wrapper').style.display = 'block';
    document.getElementById('contact-success-state').style.display = 'none';
};
