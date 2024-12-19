/**
 * Create a card element for a movie, TV show, or person.
 * @param {Object} item - The item data (name, rating, overview, etc.)
 * @param {string} type - The type of the item (movie, tv, person).
 * @param {string} placeholderImage - The URL of the placeholder image.
 * @param {boolean} includeOverview - Whether to include the overview in the card.
 * @returns {string} - The HTML string for the card.
 */
export function createCard(item, type, placeholderImage, includeOverview = false) {
    const imageUrl = item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}` : placeholderImage;
    let cardContent = `
        <div class="col-md-3 mb-4">
            <div class="card" data-id="${item.id}" data-type="${type}">
                <img src="${imageUrl}" class="card-img-top" alt="${item.title || item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.title || item.name}</h5>
    `;

    if (type === 'movie') {
        cardContent += `
            <p class="card-text">Release Date: ${item.release_date}</p>
        `;
        if (includeOverview) {
            cardContent += `<p class="card-text">${item.overview}</p>`;
        }
    } else if (type === 'tv') {
        cardContent += `
            <p class="card-text">First Air Date: ${item.first_air_date}</p>
        `;
        if (includeOverview) {
            cardContent += `<p class="card-text">${item.overview}</p>`;
        }
    } else if (type === 'person') {
        cardContent += `
            <p class="card-text">Known for: ${item.known_for_department}</p>
            <ul class="list-unstyled">
                ${item.known_for.map(knownItem => `<li>${knownItem.media_type === 'movie' ? 'Movie' : 'TV'}: ${knownItem.title || knownItem.name}</li>`).join('')}
            </ul>
        `;
    }

    cardContent += `
                </div>
            </div>
        </div>
    `;

    return cardContent;
}