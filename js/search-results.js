import fetchData from './fetch.js';
import { showDetail } from './detail-modal.js';
import { createCard } from './cardTemplate.js';

const searchUrl = 'https://api.themoviedb.org/3/search/multi?language=en-US';
const placeholderImage = 'https://via.placeholder.com/500x300?text=No+Image';

// Handle the search and display results.
export async function handleSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const searchResultsContainer = document.getElementById('search-results');
    if (!query) {
        searchResultsContainer.innerHTML = '<p class="text-danger">No search query provided.</p>';
        return;
    }
    try {
        const data = await fetchData(`${searchUrl}&query=${encodeURIComponent(query)}`);
        searchResultsContainer.innerHTML = '<h2 class="col-12">Search Results</h2>';
        if (data && data.results && data.results.length > 0) {
            // Top-10 Movies List
            const top10Movies = data.results
                .filter(result => result.media_type === 'movie')
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, 10);
            if (top10Movies.length > 0) {
                searchResultsContainer.innerHTML += '<h3 class="col-12">Top 10 Movies</h3>';
                top10Movies.forEach(movie => {
                    searchResultsContainer.innerHTML += createCard(movie, 'movie', placeholderImage, true);
                });
            }

            // All Movies
            const allMovies = data.results.filter(result => result.media_type === 'movie');
            if (allMovies.length > 0) {
                searchResultsContainer.innerHTML += '<h3 class="col-12">All Movies</h3>';
                allMovies.forEach(movie => {
                    searchResultsContainer.innerHTML += createCard(movie, 'movie', placeholderImage, true);
                });
            }

            // All TV Shows
            const allTVShows = data.results.filter(result => result.media_type === 'tv');
            if (allTVShows.length > 0) {
                searchResultsContainer.innerHTML += '<h3 class="col-12">All TV Shows</h3>';
                allTVShows.forEach(tvShow => {
                    searchResultsContainer.innerHTML += createCard(tvShow, 'tv', placeholderImage, true);
                });
            }

            // All People
            const allPeople = data.results.filter(result => result.media_type === 'person');
            if (allPeople.length > 0) {
                searchResultsContainer.innerHTML += '<h3 class="col-12">All People</h3>';
                allPeople.forEach(person => {
                    searchResultsContainer.innerHTML += createCard(person, 'person', placeholderImage, true);
                });
            }

            // Add event listeners to cards for detail modal
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = card.getAttribute('data-id');
                    const type = card.getAttribute('data-type');
                    showDetail(id, type);
                });
            });
        } else {
            searchResultsContainer.innerHTML += '<p class="text-warning">No results found.</p>';
        }
    } catch (error) {
        searchResultsContainer.innerHTML = '<p class="text-danger">An error occurred while fetching data. Please try again later.</p>';
    }
}