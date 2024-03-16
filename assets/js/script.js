const searchButton = document.getElementById("search-button");
const cityName = $('input[name="city"]');
const stateCode = document.getElementById("combobox");
const citySearch = document.getElementById("cityNameInput");
let nextCity = JSON.parse(localStorage.getItem(""));
const cityStateButton = document.getElementById("cs-button");
const forecastArea = document.getElementById("forecast");

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
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityID}%2C%20${stateID}/today?unitGroup=us&include=current&key=694QZXFHP5BSEXVD52Y94CZ5W&contentType=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const currentTemp = document.getElementById("current-temp");
      const currentWind = document.getElementById("current-wind");
      const currentHumidity = document.getElementById("current-humidity");
      const currentCity = document.getElementById("name-and-date");
      currentTemp.textContent = data.days[0].temp;
      currentWind.textContent = data.days[0].windspeed;
      currentHumidity.textContent = data.days[0].humidity;
      currentCity.textContent = `${cityID}, ${stateID} - ${today}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityID}%2C%20${stateID}/next7days?unitGroup=us&include=days&key=694QZXFHP5BSEXVD52Y94CZ5W&contentType=json`
  )
    .then((response) => response.json())
    .then((data) => {
      forecastArea.innerHTML = "";
      for (let i = 1; i <= 5; i++) {
        const inputDate1 = data.days[i].datetime;
        const parsedDate1 = new Date(inputDate1);
        const month1 = parsedDate1.getMonth() + 1;
        const day1 = parsedDate1.getDate() + 1;
        const year1 = parsedDate1.getFullYear();
        const formattedDate1 = `${month1}/${day1}/${year1}`;
        const day1Date = document.createElement("h4");
        const day1Icon = document.createElement("img");
        const day1Temp = document.createElement("h5");
        const day1Wind = document.createElement("h5");
        const day1Humidity = document.createElement("h5");
        day1Date.textContent = formattedDate1;
        day1Icon.setAttribute(
          "src",
          `../assets/images/icons/${data.days[i].icon}.png`
        );
        day1Icon.classList.add("icons");
        day1Temp.textContent = `Temp: ${data.days[i].temp}°F`;
        day1Wind.textContent = `Wind: ${data.days[i].windspeed}m/s`;
        day1Humidity.textContent = `Humidity: ${data.days[i].humidity}%`;
        const day1Card = document.createElement("div");
        day1Card.classList.add("day-card");
        day1Card.appendChild(day1Date);
        day1Card.appendChild(day1Icon);
        day1Card.appendChild(day1Temp);
        day1Card.appendChild(day1Wind);
        day1Card.appendChild(day1Humidity);
        forecastArea.appendChild(day1Card);
      }
    });
}

function getLocationData(event) {
  event.preventDefault();
  collectInput();
}

document.addEventListener("click", function (e) {
  const target = e.target.closest("#cs-button");
  if (target) {
    let cs = target.textContent;
    let csNoSpaces = cs.replace(/ /g, "");
    let csFormatted = csNoSpaces.replace(/,/g, "%2C%20");
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${csFormatted}/today?unitGroup=us&include=current&key=694QZXFHP5BSEXVD52Y94CZ5W&contentType=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const currentTemp = document.getElementById("current-temp");
        const currentWind = document.getElementById("current-wind");
        const currentHumidity = document.getElementById("current-humidity");
        const currentCity = document.getElementById("name-and-date");
        currentTemp.textContent = data.days[0].temp;
        currentWind.textContent = data.days[0].windspeed;
        currentHumidity.textContent = data.days[0].humidity;
        currentCity.textContent = `${cs} - ${today}`;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  let locationString = target.textContent;
  const [city, state] = locationString.split(", ");
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}/next7days?unitGroup=us&include=days&key=694QZXFHP5BSEXVD52Y94CZ5W&contentType=json`
  )
    .then((response) => response.json())
    .then((data) => {
      forecastArea.innerHTML = "";
      for (let i = 1; i <= 5; i++) {
        const inputDate1 = data.days[i].datetime;
        const parsedDate1 = new Date(inputDate1);
        const month1 = parsedDate1.getMonth() + 1;
        const day1 = parsedDate1.getDate() + 1;
        const year1 = parsedDate1.getFullYear();
        const formattedDate1 = `${month1}/${day1}/${year1}`;
        const day1Date = document.createElement("h4");
        const day1Icon = document.createElement("img");
        const day1Temp = document.createElement("h5");
        const day1Wind = document.createElement("h5");
        const day1Humidity = document.createElement("h5");
        day1Date.textContent = formattedDate1;
        day1Icon.setAttribute(
          "src",
          `../assets/images/icons/${data.days[i].icon}.png`
        );
        day1Icon.classList.add("icons");
        day1Temp.textContent = `Temp: ${data.days[i].temp}°F`;
        day1Wind.textContent = `Wind: ${data.days[i].windspeed}m/s`;
        day1Humidity.textContent = `Humidity: ${data.days[i].humidity}%`;
        const day1Card = document.createElement("div");
        day1Card.classList.add("day-card");
        day1Card.appendChild(day1Date);
        day1Card.appendChild(day1Icon);
        day1Card.appendChild(day1Temp);
        day1Card.appendChild(day1Wind);
        day1Card.appendChild(day1Humidity);
        forecastArea.appendChild(day1Card);
      }
    });
});
//Pseudocoding: 

//when "search" button is pressed, the city name input and state input.value are collected

//the city name and state are saved as an array object in local storage

//the city name and state appear below the search bars (in the .city-list ul) as hyperlinks

//keep any searched city/state pairs as links in the sidebar under the search boxes - have the links run through the "get weather data" function again, in case the user clicks on the cities again another day - it should always pull the most recent data from the API

//   //use the city name and state code with the weather api to get back weather data

//   //change the .current-weather h3 to a string concatenation (or template literal) to include the city name and date

//   //pull from the weather api data to get current temp, wind, and humidity for the current city, and set the "current-temp", "current-wind", and "current-humidity" spans to those values.

//   //pull from the weather api data to get five days of temp, wind, and humidity

//   //iterate through the t/w/h data to create five cards below the "current-weather" section (in the "forecast" section)
