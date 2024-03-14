//Pseudocoding

//create event listener for "search" button

//when "search" button is pressed, the city name input and state input.value are collected

//the city name and state are saved as an array object in local storage

//the city name and state appear below the search bars (in the .city-list ul) as hyperlinks

//use the city name and state input with the universal geocoder api to return the latitude and longitude

//use the latitude and longitude with the weather api to get back weather data

//change the .current-weather h3 to a string concatenation (or template literal) to include the city name and date

//pull from the weather api data to get current temp, wind, and humidity for the current city, and set the "current-temp", "current-wind", and "current-humidity" spans to those values.

//pull from the weather api data to get five days of temp, wind, and humidity

//iterate through the t/w/h data to create five cards below the "current-weather" section (in the "forecast" section)

//keep any searched city/state pairs as links in the sidebar under the search boxes - have the links run through the "get weather data" function again, in case the user clicks on the cities again another day - it should always pull the most recent data from the API
