import fetchData from './fetch.js';

/**
 * Show detailed view in a modal.
 * @param {string} id - The unique ID of the item (movie, tv, person).
 * @param {string} type - The type of the item (movie, tv, person).
 */
export async function showDetail(id, type) {
    const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    const detailModalBody = document.getElementById('detailModalBody');
    const data = await fetchData(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`);
    let detailContent = '';

    if (type === 'movie') {
        detailContent = `
            <h3>${data.title}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="img-fluid mb-3" alt="${data.title}">
            <p><strong>Release Date:</strong> ${data.release_date}</p>
            <p><strong>Overview:</strong> ${data.overview}</p>
            <p><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Runtime:</strong> ${data.runtime} minutes</p>
            <p><strong>Rating:</strong> ${data.vote_average}</p>
        `;
    } else if (type === 'tv') {
        detailContent = `
            <h3>${data.name}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="img-fluid mb-3" alt="${data.name}">
            <p><strong>First Air Date:</strong> ${data.first_air_date}</p>
            <p><strong>Overview:</strong> ${data.overview}</p>
            <p><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Seasons:</strong> ${data.number_of_seasons}</p>
            <p><strong>Episodes:</strong> ${data.number_of_episodes}</p>
            <p><strong>Rating:</strong> ${data.vote_average}</p>
        `;
    } else if (type === 'person') {
        const age = data.birthday ? `${new Date().getFullYear() - new Date(data.birthday).getFullYear()} years old` : 'N/A';
        const credits = await fetchData(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`);
        const totalCredits = credits.cast.length + credits.crew.length;

        detailContent = `
            <h3>${data.name}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.profile_path}" class="img-fluid mb-3" alt="${data.name}">
            <p><strong>Known for:</strong> ${data.known_for_department}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Popularity:</strong> ${data.popularity}</p>
            <p><strong>Total Credits:</strong> ${totalCredits}</p>
            <h4>Credits</h4>
            <ul class="list-unstyled">
                ${credits.cast.map(item => `<li>${item.media_type === 'movie' ? 'Movie' : 'TV'}: ${item.title || item.name} (${item.character})</li>`).join('')}
                ${credits.crew.map(item => `<li>${item.media_type === 'movie' ? 'Movie' : 'TV'}: ${item.title || item.name} (${item.job})</li>`).join('')}
            </ul>
        `;
    }

    detailModalBody.innerHTML = detailContent;
    detailModal.show();
}