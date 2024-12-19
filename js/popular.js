import fetchData from './fetch.js';
import { showDetail } from './detail-modal.js';
import { createCard } from './cardTemplate.js';

const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
const placeholderImage = 'https://via.placeholder.com/500x300?text=No+Image';

// Fetch and display popular movies.
export async function displayPopular() {
    const data = await fetchData(popularUrl);
    if (data && data.results) {
        const popularContainer = document.getElementById('popular');
        popularContainer.innerHTML = '<h2 class="col-12">Popular Movies</h2>';
        data.results.slice(0, 10).forEach(movie => {
            popularContainer.innerHTML += createCard(movie, 'movie', placeholderImage, false);
        });

        // Add event listeners to cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const type = card.getAttribute('data-type');
                showDetail(id, type);
            });
        });
    }
}