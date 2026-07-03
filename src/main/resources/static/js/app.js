/* -------------------------------------------------------------
   CineStream Global App JS Controller
   ------------------------------------------------------------- */

// State and constants
const THEME_KEY = 'cinestream_theme';
const WISHLIST_KEY = 'cinestream_watchlist';
const CONTINUE_WATCHING_KEY = 'cinestream_continue_watching';
const RECENTLY_VIEWED_KEY = 'cinestream_recently_viewed';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initTrailerModal();
    initGlobalShortcuts();
});

/* -------------------------------------------------------------
   Theme Management
   ------------------------------------------------------------- */
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }
}

/* -------------------------------------------------------------
   Navigation, Dropdowns, Sidebar
   ------------------------------------------------------------- */
function initNavigation() {
    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Profile Dropdown
    const profileTrigger = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
    }

    // Mobile Sidebar Menu
    const menuTrigger = document.getElementById('mobile-menu-trigger');
    const menuClose = document.getElementById('mobile-menu-close');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuTrigger && sidebar && overlay) {
        menuTrigger.addEventListener('click', () => {
            sidebar.classList.add('show');
            overlay.classList.add('show');
        });
    }

    if (menuClose && sidebar && overlay) {
        menuClose.addEventListener('click', closeMobileMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        if (sidebar) sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    }

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        if (profileDropdown && profileDropdown.classList.contains('show')) {
            profileDropdown.classList.remove('show');
        }
    });

    // Search trigger redirects to search page
    const searchTrigger = document.getElementById('search-trigger');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            window.location.href = '/search';
        });
    }
}

/* -------------------------------------------------------------
   Trailer Modal Controller
   ------------------------------------------------------------- */
function initTrailerModal() {
    const modal = document.getElementById('trailer-modal');
    const closeBtn = document.getElementById('close-modal');
    const iframe = document.getElementById('trailer-iframe');

    if (closeBtn && modal && iframe) {
        closeBtn.addEventListener('click', closeTrailer);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeTrailer();
            }
        });
    }
}

function openTrailer(trailerUrl) {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');

    if (modal && iframe) {
        // Handle embedding if YouTube url is just ID vs. full URL
        let finalUrl = trailerUrl;
        if (trailerUrl && !trailerUrl.includes('http')) {
            finalUrl = `https://www.youtube.com/embed/${trailerUrl}?autoplay=1`;
        } else if (trailerUrl && trailerUrl.includes('youtube.com/embed/')) {
            finalUrl = trailerUrl.includes('?') ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`;
        }

        iframe.src = finalUrl;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }
}

function closeTrailer() {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');

    if (modal && iframe) {
        modal.classList.remove('show');
        iframe.src = ''; // Clear source to stop playback
        document.body.style.overflow = ''; // Restore scroll
    }
}

/* -------------------------------------------------------------
   Keyboard Shortcuts
   ------------------------------------------------------------- */
function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ignore shortcut if user is typing in form controls
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }

        // Press 's' or '/' to search
        if (e.key === 's' || e.key === '/') {
            e.preventDefault();
            window.location.href = '/search';
        }

        // Press 't' to toggle theme
        if (e.key === 't') {
            const themeToggleBtn = document.getElementById('theme-toggle');
            if (themeToggleBtn) themeToggleBtn.click();
        }

        // Escape closes trailer modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('trailer-modal');
            if (modal && modal.classList.contains('show')) {
                closeTrailer();
            }
        }
    });
}

/* -------------------------------------------------------------
   Watchlist (Local Storage "My List")
   ------------------------------------------------------------- */
const Watchlist = {
    get() {
        const stored = localStorage.getItem(WISHLIST_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    add(id) {
        const list = this.get();
        if (!list.includes(id)) {
            list.push(id);
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
            this.dispatchChange(id, 'added');
        }
    },

    remove(id) {
        let list = this.get();
        if (list.includes(id)) {
            list = list.filter(item => item !== id);
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
            this.dispatchChange(id, 'removed');
        }
    },

    toggle(id) {
        if (this.has(id)) {
            this.remove(id);
            return false;
        } else {
            this.add(id);
            return true;
        }
    },

    has(id) {
        return this.get().includes(id);
    },

    dispatchChange(id, action) {
        const event = new CustomEvent('watchlistChanged', { detail: { id, action } });
        window.dispatchEvent(event);
    }
};

/* -------------------------------------------------------------
   Continue Watching & Recently Viewed Managers
   ------------------------------------------------------------- */
const ContinueWatching = {
    get() {
        const stored = localStorage.getItem(CONTINUE_WATCHING_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    // Save playing position progress (simulated percentage: e.g. 72)
    save(id, progressPercent) {
        let list = this.get();
        // Remove duplicate if it already exists
        list = list.filter(item => item.id !== id);
        
        // Add to front of list
        list.unshift({
            id,
            progress: progressPercent,
            timestamp: Date.now()
        });

        // Limit to last 8 items
        if (list.length > 8) {
            list.pop();
        }

        localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(list));
    },

    remove(id) {
        let list = this.get();
        list = list.filter(item => item.id !== id);
        localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(list));
    }
};

const RecentlyViewed = {
    get() {
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    add(id) {
        let list = this.get();
        // Remove duplicate
        list = list.filter(item => item !== id);
        // Add to front
        list.unshift(id);
        
        // Limit to 10 items
        if (list.length > 10) {
            list.pop();
        }
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list));
    }
};

// Export to window object for global availability
window.Watchlist = Watchlist;
window.ContinueWatching = ContinueWatching;
window.RecentlyViewed = RecentlyViewed;
window.openTrailer = openTrailer;
window.closeTrailer = closeTrailer;
