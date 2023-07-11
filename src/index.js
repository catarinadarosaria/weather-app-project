//API call for Forecast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

////API call for General Weather Info
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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

// Fahrenheit and Celsius conversion buttons

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// API Call for temperature
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

//Search Engine for City Temperature
let searchTemperature = document.querySelector("form");
searchTemperature.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  retrieveTemperature(city);
});

//Search Engine for Geolocation City
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationTemperature);

// Current Date
let now = new Date();
let currentDate = document.querySelector(".date-time");

//Forecast Construction
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
retrieveTemperature("Porto");
