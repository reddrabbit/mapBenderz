// Declare a variable object that stores all functions and variables for using the API
// Create an account on OpenWeatherMap.org
let weather = {
    "apiKey": '655ec96887b13aa272a77e6d6767f70a',
    getWeather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city 
        + '&units=metric&appid='
        +this.apiKey)
        .then((response)=> response.json())
        .then((data) => this.showWeather(data));
    },
    showWeather: function(data){
        const {name} = data;
        // Weather returns an array, so we need to slice it to get at the first element that holds the data needed for the operation
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        // console.log(name, icon, temp, description, speed);
        document.querySelector(".city").innerText = "The Weather in "+ name;
        document.querySelector(".weatherIcon").src="http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".temp").innerText = Math.round(temp)+"°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = "Windspeed: "+ speed+" km/h";
        document.querySelector(".humidity").innerText = "Humidity: "+humidity+"%";
    },

    search: function(){
        this.getWeather(document.querySelector(".searchBar").value);
    }

};

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
})

document.querySelector(".searchBar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});

weather.getWeather("Oshawa");