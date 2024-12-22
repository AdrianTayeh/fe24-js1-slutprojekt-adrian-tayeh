import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { displayFeaturedMovies, displayPopularActors, displayLatestNews } from './index.js';
import { displayPopular } from './popular.js';
import { displayTopRated } from './top-rated.js';
import { handleSearch } from './search-results.js';

/**
 * Handle the search form submission.
 * @param {Event} event - The form submission event.
 */
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    window.location.href = `./html/search-results.html?query=${encodeURIComponent(query)}`;
});

// Call functions based on the current page
if (document.getElementById('featured-movies')) {
    displayFeaturedMovies();
    displayPopularActors();
    displayLatestNews();
}

if (document.getElementById('popular')) {
    displayPopular();
}

if (document.getElementById('top-rated')) {
    displayTopRated();
}

if (document.getElementById('search-results')) {
    handleSearch();
}