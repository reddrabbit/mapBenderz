// Declare a variable object that stores all functions and variables for using the API
// Create an account on OpenWeatherMap.org {FOSS}
let weather = {
    // Replace the apikey parameters with your apikey from openweathermap.org
    "apiKey": '655ec96887b13aa272a77e6d6767f70a',
    getWeather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city 
        + '&units=metric&appid='
        +this.apiKey)
        .then((response)=> response.json())
        .then((data) => this.showWeather(data));
    },
    // Add or remove data as per api documentation for the returned json response. 
    showWeather: function(data){
        const {name} = data;
        // Weather returns an array, so it needs to be sliced to get at the first element that holds the data needed for the operation
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        // Access containers from the HTML that have been created to host the data
        document.querySelector(".city").innerText = "The Weather in "+ name;
        document.querySelector(".weatherIcon").src="https://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".temp").innerText = Math.round(temp)+"°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = "Windspeed: "+ speed+" km/h";
        document.querySelector(".humidity").innerText = "Humidity: "+humidity+"%";
    },
    // Set up the searchbar function to pass the value entered into it to the getweather function
    search: function(){
        this.getWeather(document.querySelector(".searchBar").value);
    }

};
//Create an event listner for when the search button is clicked
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
})
// Create event listner to react when the enter key is pushed. 
document.querySelector(".searchBar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});
document.getElementById("precipitation").addEventListener("click", function(){
    const url = 'rainview.html';
    window.open(url, '_blank');
});
// Call getweather function on a default city. Change as per your preferences.
weather.getWeather("Oshawa");
