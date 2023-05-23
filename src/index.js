function showTemperature(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;

  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("h3");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)}km/h`;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  const iconMapping = {
    "01d.png": "sun.png",
    "02d.png": "sun-cloud.png",
    "03d.png": "cloud.png",
    "04d.png": "clouds.png",
    "09d.png": "rain.png",
    "10d.png": "sun_rain.png",
    "11d.png": "storm-rain.png",
    "13d.png": "snow.png",
    "50d.png": "windy.png",
    "01n.png": "night.png",
    "02n.png": "night_cloud.png",
    "03n.png": "cloud.png",
    "04n.png": "clouds.png",
    "09n.png": "rain.png",
    "10n.png": "night_rain.png",
    "11n.png": "night_thunder.png",
    "13n.png": "snow.png",
    "50n.png": "night_wind.png",
  };
  const apiIconCode = response.data.weather[0].icon.slice(0, -1);
  const localIcon = iconMapping[apiIconCode];
  iconElement.src = `images/${localIcon}`;
  function convertToCelsius(event) {
    event.preventDefault();
    temperature.innerHTML = Math.round(response.data.main.temp);
    celsius.classList.add("celsiusClick");
    fahrenheit.classList.remove("fahrenheitClick");
  }

  celsius.addEventListener("click", convertToCelsius);

  function convertToFahrenheit(event) {
    event.preventDefault();
    temperature.innerHTML = Math.round(response.data.main.temp * 1.8) + 32;
    fahrenheit.classList.add("fahrenheitClick");
    celsius.classList.remove("celsiusClick");
  }

  fahrenheit.addEventListener("click", convertToFahrenheit);
}

function retrieveTemperature(city) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let units = "metric";
  let formattedCity = encodeURIComponent(city);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function retrieveCurrentLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocationTemperature() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocationTemperature);
}

let searchTemperature = document.querySelector("form");
searchTemperature.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  retrieveTemperature(city);
});

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationTemperature);

let now = new Date();
let currentDate = document.querySelector(".date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let temperature = document.querySelector("#temperature-value");
let iconElement = document.querySelector("#icon");
