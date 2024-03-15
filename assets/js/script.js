//global constants:
const searchButton = document.getElementById("search-button");
const cityName = $('input[name="city"]');
const stateCode = document.getElementById("combobox");
const citySearch = document.getElementById("cityNameInput");
let nextCity = JSON.parse(localStorage.getItem(""));
const cityStateButton = document.getElementById("cs-button");

//event listeners:
searchButton.addEventListener("click", getLocationData);

window.addEventListener("DOMContentLoaded", function () {
  const cityList = document.getElementById("city-list");
  cityList.value = "";
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    userData.forEach((userData) => {
      const cityID = userData.City;
      const stateID = userData.State;
      const csButton = document.createElement("button");
      csButton.classList.add("city-state-button");
      csButton.setAttribute("type", "button");
      csButton.setAttribute("id", "cs-button");
      csButton.textContent = `${cityID}, ${stateID}`;
      cityList.appendChild(csButton);
    });
  }
});

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;

function collectInput() {
  const cityList = document.getElementById("city-list");
  const cityID = cityName.val();
  const stateID = combobox.value;
  let existingData = localStorage.getItem("userData");
  let userDataArray = existingData ? JSON.parse(existingData) : [];
  let newUserData = {
    City: cityID,
    State: stateID,
  };
  userDataArray.push(newUserData);
  let updatedData = JSON.stringify(userDataArray);
  localStorage.setItem("userData", updatedData);
  const csButton = document.createElement("button");
  csButton.classList.add("city-state-button");
  csButton.setAttribute("type", "button");
  csButton.setAttribute("id", "cs-button");
  csButton.textContent = `${cityID}, ${stateID}`;
  cityList.appendChild(csButton);
  combobox.selectedIndex = 0;
  citySearch.value = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityID},${stateID},us&units=imperial&appid=48168ac0a5aca7ac5601cd3b630e2b83`
  )
    .then((response) => response.json())
    .then((data) => {
      const currentTemp = document.getElementById("current-temp");
      const currentWind = document.getElementById("current-wind");
      const currentHumidity = document.getElementById("current-humidity");
      const currentCity = document.getElementById("name-and-date");
      currentTemp.textContent = data.list[0].main.temp;
      currentWind.textContent = data.list[0].wind.speed;
      currentHumidity.textContent = data.list[0].main.humidity;
      currentCity.textContent = `${cityID}, ${stateID} - ${today}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function getLocationData(event) {
  event.preventDefault();
  collectInput();
}
//Geocoding API Key: rwEBHlIBYwqBb5/65QpejA==d7Hi5xB2HqdSfV1D

//when "search" button is pressed, the city name input and state input.value are collected
//the city name and state are saved as an array object in local storage
//the city name and state appear below the search bars (in the .city-list ul) as hyperlinks
//keep any searched city/state pairs as links in the sidebar under the search boxes - have the links run through the "get weather data" function again, in case the user clicks on the cities again another day - it should always pull the most recent data from the API

//   //use the city name and state code with the weather api to get back weather data
//   getWeatherData();
//   //change the .current-weather h3 to a string concatenation (or template literal) to include the city name and date

//   //pull from the weather api data to get current temp, wind, and humidity for the current city, and set the "current-temp", "current-wind", and "current-humidity" spans to those values.
//   publishCurrentWeather();
//   //pull from the weather api data to get five days of temp, wind, and humidity

//   //iterate through the t/w/h data to create five cards below the "current-weather" section (in the "forecast" section)
//   createForecastCards();

document.addEventListener("click", function (e) {
  const target = e.target.closest("#cs-button");
  if (target) {
    let cs = target.textContent;
    let csNoSpaces = cs.replace(/ /g, "");
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${csNoSpaces},us&units=imperial&appid=48168ac0a5aca7ac5601cd3b630e2b83`
    )
      .then((response) => response.json())
      .then((data) => {
        const currentTemp = document.getElementById("current-temp");
        const currentWind = document.getElementById("current-wind");
        const currentHumidity = document.getElementById("current-humidity");
        const currentCity = document.getElementById("name-and-date");
        currentTemp.textContent = data.list[0].main.temp;
        currentWind.textContent = data.list[0].wind.speed;
        currentHumidity.textContent = data.list[0].main.humidity;
        currentCity.textContent = `${cs} - ${today}`;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
});
