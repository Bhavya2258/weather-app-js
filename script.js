async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const apiKey = "1aae3f20fcb44f1d903131809260709";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            result.innerHTML = `<p>${data.error.message}</p>`;
            return;
        }

        result.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p class="temp">${data.current.temp_c}°C</p>
            <p>${data.current.condition.text}</p>
            <img src="https:${data.current.condition.icon}" alt="Weather Icon">
        `;
    } catch (error) {
        result.innerHTML = "<p>Failed to fetch weather data.</p>";
    }
}