
let date = dayjs().format('(MM/DD/YY)')
console.log(date)
let searchedCity = document.getElementById('cityname')
let button = document.getElementById('button')
let apiKey = '56cb8785bd6021e59f6df2e539cf6f2c'
let fiveDayForecast = document.getElementById('five-day')
let searchHistory = []
let city = '' || 'London';


button.addEventListener("click", function (event) {
    event.preventDefault()


    let city = searchedCity.value
    if (city !== "") {
        displayWeather(city)


    }

})

function displayWeather(city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let cityName = document.getElementById('current-city');
                    let temp = document.getElementById('current-city-temperature')
                    let wind = document.getElementById('current-city-wind')
                    let humidity = document.getElementById('current-city-humidity')
                    let icon = document.createElement("img")
                    icon.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
                    lat = data.coord.lat
                    lon = data.coord.lon

                    temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
                    humidity.textContent = "Humidity: " + data.main.humidity + "%";
                    wind.textContent = "Wind: " + data.wind.speed + "Mph";
                    cityName.textContent = data.name + " " + date
                    cityName.appendChild(icon)


                    console.log(data)
                    forecast(lon, lat)

                }
                )

            }
        })
}


function forecast(lat, lon) {
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {

            console.log(forecastData)

            let forecastTitle = document.createElement('h3');
            forecastTitle.textContent = "5-day forecast:";
            for (let i = 0; i < 5; i++) {
                // Create a new container element for each day's forecast
                let forecastContainer = document.createElement('div');
                forecastContainer.setAttribute("class", "card")

                // Create and update the elements for each day's forecast


                let forecastDate = document.createElement('p');
                let unixTimestamp = forecastData.list[i].dt;
                let date = new Date(unixTimestamp * 1000);
                let resultDate = dayjs(date).format('MM/DD/YY');
                forecastDate.textContent = resultDate;

                let forecastIcon = document.createElement('img');
                forecastIcon.src = "https://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";

                let forecastTemp = document.createElement('p');
                forecastTemp.textContent = "Temp: " + Math.floor(forecastData.list[i].main.temp) + "°F";

                let forecastWind = document.createElement('p');
                forecastWind.textContent = "Wind: " + forecastData.list[i].wind.speed + "Mph";

                let forecastHumidity = document.createElement('p');
                forecastHumidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%";

                // Append the elements to the forecast container

                forecastContainer.appendChild(forecastDate);
                forecastContainer.appendChild(forecastIcon);
                forecastContainer.appendChild(forecastTemp);
                forecastContainer.appendChild(forecastWind);
                forecastContainer.appendChild(forecastHumidity);

                // Append the forecast container to the parent element
                fiveDayForecast.appendChild(forecastContainer);
            }

        })
}










displayWeather(city)


