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
let apiUrL = 'https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}';
axios.get(apiUrL).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");