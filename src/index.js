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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function convertToCelsius(event) {
  event.preventDefault();
  temperatureValue.innerHTML = Math.round(response.data.main.temp);
  celsius.classList.add("celsiusClick");
  fahrenheit.classList.remove("fahrenheitClick");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  temperatureValue.innerHTML = Math.round(response.data.main.temp * 1.8) + 32;
  fahrenheit.classList.add("fahrenheitClick");
  celsius.classList.remove("celsiusClick");
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
