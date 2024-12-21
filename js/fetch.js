const API_KEY = "98336a8670b5a655e0c97ebafe62e652";

/**
 * Fetch data from the given URL.
 * @param {string} url - The API URL to fetch data from.
 * @returns {Promise<Object>} The fetched data.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchData(url) {
    try {
        const response = await axios.get(`${url}&api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        displayErrorMessage('Network error: Unable to fetch data. Please check your internet connection.');
        throw error;
    }
}

/**
 * Display an error message to the user.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    } else {
        alert(message);
    }
}

export default fetchData;