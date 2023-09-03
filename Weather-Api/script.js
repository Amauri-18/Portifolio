class Clima {
    city;
    country;
    description;
    flag;
    humidity;
    icon;
    id;
    temperature;      
    wind;    
}

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const cityElement = document.querySelector('#city span');
const flagElement = document.querySelector('#country-flag'); // Bandeira
const tempElement = document.querySelector('#temperature span'); // Temperatura
const descElement = document.querySelector("#description"); // Nublado
const weatherIconElement = document.querySelector("#weather-icon"); // icone
const humidityElement = document.querySelector("#humidity span"); // Humidade
const windElement = document.querySelector("#wind span"); // Vento
const weatherData = document.querySelector("#weather-data");

const render = (data) => {

    const errorCode = Number.parseInt(data.cod);

    switch(errorCode) {
    case 200:
        const clima = new Clima;

        clima.name = data.name;
        clima.temperature = Number.parseInt(data.main.temp).toFixed(1);
        clima.description = data.weather[0].description;  
        clima.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        clima.flag = `https://flagsapi.com/${data.sys.country}/shiny/64.png`;
        clima.humidity = `${data.main.humidity}%`;
        clima.wind = (Number.parseFloat(data.wind.speed) * 3.6).toFixed(1) + ' km/h';

        cityElement.innerHTML = clima.name;
        tempElement.innerHTML = clima.temperature;
        descElement.innerHTML = clima.description;        
        weatherIconElement.setAttribute('src', clima.icon); 
        flagElement.setAttribute('src', clima.flag); 
        humidityElement.innerHTML = clima.humidity;
        windElement.innerHTML = clima.wind;
        weatherData.classList.remove("hide"); 

        break;
    case 401:
        window.alert('401 - Invalid API key')
        cityInput.innerHTML = "";
        break;
    case 404:
        window.alert("404 - City not found");
        break; 
    }
}

// Funções
const getWatherData = async(city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}&lang=pt_br`;
    return await fetch(weatherUrl)
        .then((response) => response.json())
        .catch(error => console.log())
}
    
const showWeatherData = async (city) => { 
    try {
        const data = await getWatherData(city);
        render(data);

    } catch(error) {
        // implementar tratativa de erro
    }
}

// Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;      

    if(city) {
        showWeatherData(city);        
    }
});

cityInput.addEventListener("input", (e) => {   
    
    if(cityInput.value == "") {        
        weatherData.classList.add("hide");
    } 
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        if(city) {
            showWeatherData(city);
        }
    }
} );


