let localIcon;
let iconElement = document.querySelector("#icon");

function showTemperature(response) {
  console.log(response);
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
  localIcon = iconMapping[apiIconCode];
  iconElement.src = `images/${localIcon}`;
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = Math.round(
    ((parseInt(temperatureValue.innerHTML) - 32) * 5) / 9
  );
  celsiusButton.classList.add("celsiusClick");
  fahrenheitButton.classList.remove("fahrenheitClick");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = Math.round(
    (parseInt(temperatureValue.innerHTML) * 9) / 5 + 32
  );
  fahrenheitButton.classList.add("fahrenheitClick");
  celsiusButton.classList.remove("celsiusClick");
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

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", convertToCelsius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let now = new Date();
let currentDate = document.querySelector(".date-time");
