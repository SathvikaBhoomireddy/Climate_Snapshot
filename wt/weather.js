const weatherApi = {
    key: "fcc8de7015bbb202209bbf0261babf4c", 
    base: "https://api.openweathermap.org/data/2.5/"
  };
  
  const searchBox = document.querySelector('.search-box');
  searchBox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode === 13) {
      getWeatherResults(searchBox.value);
    }
  }
  
  function getWeatherResults(city) {
    fetch(`${weatherApi.base}weather?q=${city}&units=metric&APPID=${weatherApi.key}`)
      .then(weather => {
        return weather.json();
      })
      .then(displayWeatherResults)
      .catch(error => {
        alert("Error fetching weather data. Please check the city name and try again.");
        console.error(error);
      });
  }
  
  function displayWeatherResults(weather) {
    if (weather.cod !== 200) {
      alert("City not found. Please enter a valid city name.");
      return;
    }
  
    let cityElement = document.querySelector('.location .city');
    cityElement.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let dateElement = document.querySelector('.location .date');
    dateElement.innerText = dateBuilder(now);
  
    let tempElement = document.querySelector('.current .temp');
    tempElement.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weatherElement = document.querySelector('.current .weather');
    weatherElement.innerText = weather.weather[0].main;
  
    let hiLowElement = document.querySelector('.hi-low');
    hiLowElement.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  