

//* https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let searchedCity = document.getElementById('cityname')
let button = document.getElementById('button')
let apiKey = '56cb8785bd6021e59f6df2e539cf6f2c'
let searchHistory = []
let city = '' || 'brooklyn'





button.addEventListener("click", function (event) {
    event.preventDefault()
    let city = searchedCity.value
    if (city !== "") {
        displayWeather(city)
    }
    console.log(city)

})


function displayWeather(city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let cityName = document.getElementById('current-city');
                    let temp = document.getElementById('current-city-temperature')
                    let wind = document.getElementById('current-city-wind')
                    let humidity = document.getElementById('current-city-humidity')
                    temp.textContent = "Temperature: " + Math.round(data.main.temp) + " F";
                    humidity.textContent = "Humidity: " + data.main.humidity + " %";
                    wind.textContent = "Wind: " + data.wind.speed + " MPH";
                    cityName.textContent = data.name

                    console.log(data)
                });
            }
        })
}




displayWeather(city)

