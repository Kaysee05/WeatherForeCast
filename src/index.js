function refreshWeather(response) {
   let temperatureElement = document.querySelector("#temperature");
   let temperature = response.data.temperature.current;
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description");
 let humidityElement = document.querySelector("#humidity");
 let windSpeedElement = document.querySelector("#wind-speed");
 let timeElement = document.querySelector("#time");
 let date = new Date(response.data.time * 1000);
 
cityElement.innerHTML = response.data.city;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = '${response.data.temperature.humidity}%';
windSpeedElement.innerHTML = '$response.data.wind.speed}km/h';
timeElement.innerHTML = formatDate(date);
   temperatureElement.innerHTML = Math.round(temperature);
   
}

function formatDate(date) {
let minutes = date.getMinutes();
let hours = date.getHours();
let days = 
["Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"];
let day = days[date.getDay()];

if (minutes < 10) {
   minutes = '0${minutes}'; 
}

return '${day} ${hours}:${minutes}';
}


function searchCity(city) {
let apiKey = "932e5ebeaff542505e2e03t63ba9boe8";
let apiUrL = 'https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric';
axios.get(apiUrL).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function displayForecast() {
   

   let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
   let forecastHtml = "";

   days.forEach(function(day) {
forecastHtml = forecastHtml +
`
<div class="weather-forecast-day">
    <div class="weather-forecast-date">$(day)</div>
    <div class="weather-forecast-icon">⛅</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
      <strong>15&deg;</strong>
      </div>
      <div class="weather-forecast-temperature">9&deg;</div>
    </div>
    </div>
    `;
   });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML= forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();

