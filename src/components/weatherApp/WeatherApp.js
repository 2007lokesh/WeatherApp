import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import wind_icon from "../assets/wind.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humididy_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

function WeatherApp() {
  const [wicon, setWicon] = useState(cloud_icon);
  const [cityInput, setCityInput] = useState("Mathura");
  const [weatherData, setWeatherData] = useState(null);

  const api_key = "0276cad8615c77ab155d1a657b3d8dd7";

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, []);

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async () => {
    if (!cityInput.trim()) {
      alert("Please enter a valid city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${api_key}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }

      const data = await response.json();
      setWeatherData(data);

      const icon = data.weather[0].icon;
      setWicon(weatherIcons[icon]);
      setCityInput("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter your city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div className="searchIcon">
          <img src={search_icon} alt="search_icon" onClick={search} />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="icon" />
      </div>
      <div className="weather-temp">
        {weatherData && Math.floor(weatherData.main.temp)}°C
      </div>
      <div className="weather-location">{weatherData && weatherData.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humididy_icon} alt="icon" className="icon" />
          <div className="data">
            <div className="humidity-percentage">
              {weatherData && `${weatherData.main.humidity}%`}
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="icon" className="icon" />
          <div className="data">
            <div className="wind-rate">
              {weatherData && `${weatherData.wind.speed} km/h`}
            </div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
