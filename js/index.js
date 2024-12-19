import fetchData from './fetch.js';
import { createCard } from './cardTemplate.js';
import { showDetail } from './detail-modal.js';

const featuredMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US';
const popularActorsUrl = 'https://api.themoviedb.org/3/person/popular?language=en-US';
const latestNewsUrl = 'https://api.themoviedb.org/3/movie/latest?language=en-US';
const placeholderImage = 'https://via.placeholder.com/500x300?text=No+Image';

// Fetch and display featured movies in a carousel.
export async function displayFeaturedMovies() {
    const data = await fetchData(featuredMoviesUrl);
    if (data && data.results) {
        const featuredMoviesContainer = document.getElementById('featured-movies');
        data.results.slice(0, 5).forEach((movie, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage;
            featuredMoviesContainer.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${imageUrl}" class="d-block w-100" alt="${movie.title}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${movie.title}</h5>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            `;
        });

        // Add event listeners to carousel items
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                const type = 'movie';
                showDetail(id, type);
            });
        });
    }
}

// Fetch and display popular actors.
export async function displayPopularActors() {
    const data = await fetchData(popularActorsUrl);
    if (data && data.results) {
        const popularActorsContainer = document.getElementById('popular-actors');
        data.results.slice(0, 6).forEach(actor => {
            popularActorsContainer.innerHTML += createCard(actor, 'person', placeholderImage, false);
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

// Fetch and display latest movie.
export async function displayLatestNews() {
    const data = await fetchData(latestNewsUrl);
    if (data) {
        const latestNewsContainer = document.getElementById('latest-news');
        latestNewsContainer.innerHTML += `
            <div class="col-md-12">
                <h5>${data.title}</h5>
                <p>${data.overview}</p>
            </div>
        `;
    }
}