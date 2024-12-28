const API_KEY = "98336a8670b5a655e0c97ebafe62e652";

/**
 * Fetch data from the given URL.
 * @param {string} url - The API URL to fetch data from.
 * @returns {Promise<Object>} The fetched data.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchData(url) {
    try {
        clearErrorMessage();
        const response = await axios.get(`${url}&api_key=${API_KEY}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            const errorMessage = `HTTP error! status: ${response.status}`;
            displayErrorMessage(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        let errorMessage = "Network error: Unable to fetch data. Please check your internet connection and try again.";
        if (error.response) {
            // Server responded with a status other than 2xx
            errorMessage = `HTTP error! status: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
            // Request was made but no response was received
            errorMessage = "No response received from the server. Please try again later.";
        } else {
            // Something happened in setting up the request
            errorMessage = `Error: ${error.message}`;
        }
        displayErrorMessage(errorMessage);
        throw new Error(errorMessage);
    }
}

/**
 * Display an error message to the user.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
        errorContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    } else {
        alert(message);
    }
}

// Runs every time the user tries to fetch data, clears the previous error message
function clearErrorMessage() {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
        errorContainer.innerHTML = '';
    }
}

export default fetchData;