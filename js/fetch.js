const API_KEY = "98336a8670b5a655e0c97ebafe62e652";

async function fetchData(url) {
    try {
        const response = await fetch(`${url}&api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default fetchData;