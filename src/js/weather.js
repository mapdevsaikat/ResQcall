// Weather Info
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData, showError);
    } else {
        // Handle the case where geolocation is not supported by the browser
        getLocationByCityName("YourCityName");
    }
});

function getWeatherData(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // You can replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.
    const apiKey = '';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeatherData(data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

function getLocationByCityName(cityName) {
    // Use a geocoding API to get latitude and longitude for the city name.
    // Then, call getWeatherData with the obtained coordinates.
    // This step depends on the geocoding service you choose to use.
}

function displayWeatherData(data) {
    // Weather Description
    const location = `${data.name}, ${data.sys.country}`;
    //const description = `${data.weather[0].description}`;
    const temperature = `Temperature: ${data.main.temp}°C`;
    const humidity = `Humidity: ${data.main.humidity}%`;
    const windSpeed = `Wind Speed: ${data.wind.speed} m/s`;
    const pressure = `Pressure: ${data.main.pressure} hPa`;
    const weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    document.getElementById('location').textContent = location;
    document.getElementById('weather-icon').src = weatherIcon;
    //document.getElementById('weather-details').textContent = `${description}`;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind-speed').textContent = windSpeed;
    document.getElementById('pressure').textContent = pressure;
}

function showError(error) {
    // Handle geolocation errors here
    // You can provide appropriate feedback to the user.
    console.error('Error getting geolocation:', error);

    // As a fallback, you can also use a default location by calling getLocationByCityName.
    getLocationByCityName("YourCityName");
}
// End of Weather Script
