// Function to display Date and Time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// API call for Forecast
function getForecast(coordinates) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Retrieve General info from API
function showTemperature(response) {
  let timestamp = response.data.dt * 1000;
  let dateTime = formatDate(timestamp);
  let dateTimeElement = document.querySelector(".date-time");
  dateTimeElement.innerHTML = dateTime;

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

  let weatherCode = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");

  iconElement.onload = function () {
    iconElement.style.visibility = "visible";
  };
  iconElement.onerror = function () {
    iconElement.style.visibility = "hidden";
  };
  iconElement.src = getIconPath(weatherCode);

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

// API call City Search
function retrieveTemperature(city) {
  let apiKey = "e60cfe91a731d94cdd654022271b22a3";
  let units = "metric";
  let formattedCity = encodeURIComponent(city);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

// API call Geolocation
function retrieveCurrentLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e60cfe91a731d94cdd654022271b22a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocationTemperature() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocationTemperature);
}

// Search Engine for City Temperature
let searchTemperature = document.querySelector("form");
searchTemperature.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  retrieveTemperature(city);
});

// Search Engine for Geolocation City
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationTemperature);

// Forecast Construction
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let iconCode = forecastDay.weather[0].icon;
      let iconPath = getIconPath(iconCode);

      forecastHTML += `
        <div class="col-2 forecast-column">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="${iconPath}" alt="" width="42" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}º</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}º</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML += "</div>";
  forecastElement.innerHTML = forecastHTML;
}

// Get the path for the custom weather icon
function getIconPath(weatherCode) {
  let prefix = "images/";
  let suffix = ".png";

  if (weatherCode.endsWith("d")) {
    // Daytime weather
    switch (weatherCode) {
      case "01d":
        return prefix + "sun.png";
      case "02d":
        return prefix + "sun-cloud.png";
      case "03d":
        return prefix + "cloud.png";
      case "04d":
        return prefix + "clouds.png";
      case "09d":
        return prefix + "rain.png";
      case "10d":
        return prefix + "sun_rain.png";
      case "11d":
        return prefix + "storm.png";
      case "13d":
        return prefix + "snow.png";
      case "50d":
        return prefix + "windy.png";
    }
  } else if (weatherCode.endsWith("n")) {
    // Nighttime weather
    switch (weatherCode) {
      case "01n":
        return prefix + "night.png";
      case "02n":
        return prefix + "night_cloud.png";
      case "03n":
        return prefix + "cloud.png";
      case "04n":
        return prefix + "clouds.png";
      case "09n":
        return prefix + "rain.png";
      case "10n":
        return prefix + "night_rain.png";
      case "11n":
        return prefix + "night_thunder.png";
      case "13n":
        return prefix + "snow.png";
      case "50n":
        return prefix + "windy.png";
    }
  }
}

// Set initial city temperature
retrieveTemperature("Porto");
