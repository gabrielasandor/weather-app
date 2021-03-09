import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';


const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}



require('dotenv').config();

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"

}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');

        });
    }
  }

  return (<div className="first">

    <main>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="  Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">City:{weather.name}, {weather.sys.country}

              <div className="date">{dateBuilder(new Date())}</div>

            </div>

          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">Sky Conditions: {weather.weather[0].main} <br></br>
           Humidity: {weather.main.humidity}% <br></br>
           Wind: {Math.round(weather.wind.speed)} km/h
           </div>
          </div>
        </div>
      ) : ('')}
    </main>
  </div>
  );
}

export default App;
