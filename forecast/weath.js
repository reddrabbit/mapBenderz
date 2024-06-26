// Declare a variable object that stores all functions and variables for using the API
// Create an account on OpenWeatherMap.org {FOSS}
let weather = {
    // Replace the apikey parameters with your apikey from openweathermap.org
        getWeather: function(city){
            const apiKey =  '655ec96887b13aa272a77e6d6767f70a';
            fetch('https://api.openweathermap.org/data/2.5/weather?q='
            + city 
            + '&units=metric&appid='
            +apiKey)
            .then((response)=> response.json())
            .then((data) => this.showWeather(data));
    // Add fetch for forecast data
            fetch('https://api.openweathermap.org/data/2.5/forecast?q='
            +city
            +'&units=metric&appid='
            + apiKey)
            .then((response)=> response.json())
            .then((data) => this.showHourlyForecast(data));
        },
    // Add or remove data as per api documentation for the returned json response. 
    // Using object destructuring, grab all of the data necessary and put them inside of the variables
    // Variable names must reference the names as is in the returned Json 
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
    // Add function for hourly forecast data
        showHourlyForecast: function(Forecastdata){
            const hourlyForecast = document.querySelector(".hourly");
    // Clear the hourly forecast carousel so that the data does not append itself each time
            hourlyForecast.innerHTML = '';
    // Get the hourly forecast from API sliced into 3 hour time windows
    // Using the slice function, extract the first 8 items from the returned hourly data
            const forecastList = Forecastdata.list;
            const twentyFourhours = forecastList.slice(0, 8);
    
    // Iterate over the sliced data and create HTML contents to display
    // For each item it iterates over, it will extract relevant info for that item
            twentyFourhours.forEach(item =>{
                const date = new Date(item.dt * 1000);
                const hour = date.getHours();
                const hourTemp = Math.round(item.main.temp);
                const hourIcon = item.weather[0].icon;
                const hourIconURL = "https://openweathermap.org/img/w/" + hourIcon + ".png";
                const desc = item.weather[0].description
    
    //Create the html elements that will hold this info
                const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${hourIconURL}" alt="Hourly Weather Icon" title = "${desc}">
                    <span>${hourTemp}°C</span>
                </div>
            `;
    
            // 
            hourlyForecast.innerHTML += hourlyItemHtml;
                
            });
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
        window.open(url, '_parent');
    });
    // Call getweather function on a default city. Change as per your preferences.
    weather.getWeather("Oshawa");