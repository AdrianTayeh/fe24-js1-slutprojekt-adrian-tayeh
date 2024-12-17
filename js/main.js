import fetchData from './fetch.js';

const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US';
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
const searchUrl = 'https://api.themoviedb.org/3/search/multi?language=en-US';


/**
 * Fetch and display movies in a specified container.
 * @param {string} url - The API URL to fetch data from.
 * @param {string} containerId - The ID of the container to display the movies in.
 * @param {string} title - The title to display above the movies.
 */

async function displayMovies(url, containerId, title) {
    const data = await fetchData(url);
    if (data && data.results) {
        const container = document.getElementById(containerId);
        container.innerHTML = `<h2>${title}</h2>`;
        data.results.slice(0, 10).forEach(movie => {
            container.innerHTML += `
                <div>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>Release Date: ${movie.release_date}</p>
                </div>
            `;
        });
    }
}


/**
 * Handle the search form submission.
 * @param {Event} event - The form submission event.
 */
async function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    const data = await fetchData(`${searchUrl}&query=${query}`);
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '<h2>Search Results</h2>';
    if (data && data.results) {
        data.results.slice(0, 10).forEach(result => {
            if (result.media_type === 'movie') {
                searchResultsContainer.innerHTML += `
                    <div>
                        <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}">
                        <h3>${result.title}</h3>
                        <p>Release Date: ${result.release_date}</p>
                        <p>${result.overview}</p>
                    </div>
                `;
            } else if (result.media_type === 'person') {
                searchResultsContainer.innerHTML += `
                    <div>
                        <img src="https://image.tmdb.org/t/p/w500${result.profile_path}" alt="${result.name}">
                        <h3>${result.name}</h3>
                        <p>Known for: ${result.known_for_department}</p>
                        <ul>
                            ${result.known_for.map(item => `<li>${item.media_type === 'movie' ? 'Movie' : 'TV'}: ${item.title || item.name}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });
    }
}

document.getElementById('search-form').addEventListener('submit', handleSearch);

displayMovies(topRatedUrl, 'top-rated', 'Top Rated Movies');
displayMovies(popularUrl, 'popular', 'Popular Movies');