let date = dayjs().format('(MM/DD/YY)');
let searchedCity = document.getElementById('cityname');
let button = document.getElementById('button');
let apiKey = '56cb8785bd6021e59f6df2e539cf6f2c';
let fiveDayForecast = document.getElementById('five-day');
let searchHistory = document.getElementById('search-history');
let city = '' || 'Tbilisi';
let historyList = JSON.parse(localStorage.getItem('historyList')) || []; // Initialize from local storage or as an empty array

// Function to update the search history UI
function updateSearchHistoryUI() {
    searchHistory.innerHTML = ''; // Clear existing list

    // Show only the last five cities
    let lastFiveCities = historyList.slice(-5);

    lastFiveCities.forEach(function(city) {
        let listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.setAttribute("class", "list");
        listItem.addEventListener("click", function () {
            displayWeather(city);
        });
        searchHistory.appendChild(listItem);
    });
}

// Initial display of the search history on page load
updateSearchHistoryUI();

//* function to take value of input after click, show weather, and store into local storage
button.addEventListener("click", function (event) {
    event.preventDefault();

    let city = searchedCity.value.trim();

    if (city !== "") {
        displayWeather(city);
        if (!historyList.includes(city)) {
            historyList.push(city); // Add city to history if not already included
            localStorage.setItem('historyList', JSON.stringify(historyList));
            updateSearchHistoryUI();
        }
    }
});

//* get information from api and show
function displayWeather(city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let cityName = document.getElementById('current-city');
                    let temp = document.getElementById('current-city-temperature');
                    let wind = document.getElementById('current-city-wind');
                    let humidity = document.getElementById('current-city-humidity');
                    let icon = document.createElement("img");
                    icon.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    let lat = data.coord.lat;
                    let lon = data.coord.lon;

                    temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
                    humidity.textContent = "Humidity: " + data.main.humidity + "%";
                    wind.textContent = "Wind: " + data.wind.speed + " Mph";
                    cityName.textContent = data.name + " " + date;
                    cityName.appendChild(icon);

                    forecast(lon, lat);
                });
            }
        });
}

//* forecast for next five days 
function forecast(lat, lon) {
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {
            let forecastTitle = document.createElement('h3');
            forecastTitle.textContent = "5-day forecast:";
            fiveDayForecast.innerHTML = '';

            for (let i = 4; i < forecastData.list.length; i = i + 8) {
                let forecastContainer = document.createElement('div');
                forecastContainer.setAttribute("class", "card");

                let forecastDate = document.createElement('p');
                let unixTimestamp = forecastData.list[i].dt;
                let date = new Date(unixTimestamp * 1000);
                let resultDate = dayjs(date).format('MM/DD/YY');
                forecastDate.textContent = resultDate;

                let forecastIcon = document.createElement('img');
                forecastIcon.src = "https://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";

                let forecastTemp = document.createElement('p');
                forecastTemp.textContent = "Temp: " + Math.round(forecastData.list[i].main.temp) + "°F";

                let forecastWind = document.createElement('p');
                forecastWind.textContent = "Wind: " + Math.round(forecastData.list[i].wind.speed) + " Mph";

                let forecastHumidity = document.createElement('p');
                forecastHumidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%";

                forecastContainer.appendChild(forecastDate);
                forecastContainer.appendChild(forecastIcon);
                forecastContainer.appendChild(forecastTemp);
                forecastContainer.appendChild(forecastWind);
                forecastContainer.appendChild(forecastHumidity);
                fiveDayForecast.appendChild(forecastContainer);
            }
        });
}

// Initial weather display for the default city
displayWeather(city);
