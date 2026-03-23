const apiKey = 'c18a576099a24dde951105123251410';

async function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  const resultDiv = document.getElementById('weather-result');

  if (city === '') {
    resultDiv.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const weatherHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" />
      <p><strong>${data.current.temp_c}°C</strong> - ${data.current.condition.text}</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind: ${data.current.wind_kph} kph</p>
    `;

    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
