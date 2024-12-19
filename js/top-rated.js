import fetchData from './fetch.js';
import { showDetail } from './detail-modal.js';
import { createCard } from './cardTemplate.js';

const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US';
const placeholderImage = 'https://via.placeholder.com/500x300?text=No+Image';

// Fetch and display top-rated movies.
export async function displayTopRated() {
    const data = await fetchData(topRatedUrl);
    if (data && data.results) {
        const topRatedContainer = document.getElementById('top-rated');
        topRatedContainer.innerHTML = '<h2 class="col-12">Top Rated Movies</h2>';
        data.results.forEach(movie => {
            topRatedContainer.innerHTML += createCard(movie, 'movie', placeholderImage, false);
        });

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const type = card.getAttribute('data-type');
                showDetail(id, type);
            });
        });
    }
}