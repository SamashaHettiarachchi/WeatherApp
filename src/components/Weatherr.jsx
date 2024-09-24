import React, { useState, useEffect } from "react";
import "./Weather.css";
import Search_icon from "../assets/search.png";
import Snowy from "../assets/snowy.png";
import Sun from "../assets/sun.png";
import Weather from "../assets/weather.png";
import Wind_power from "../assets/wind-power.png";
import Cloudy from "../assets/cloudy.png";
import Cloudy1 from "../assets/cloudy1.png";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null); // Initial state for weather data
  const [city, setCity] = useState(""); // Default to empty input

  const allIcons = {
    "01d": Sun,
    "01n": Sun,
    "02d": Cloudy,
    "02n": Cloudy,
    "03d": Cloudy,
    "03n": Cloudy,
    "04d": Cloudy,
    "04n": Cloudy,
    "09d": Cloudy1,
    "09n": Cloudy1,
    "10d": Cloudy1,
    "10n": Cloudy1,
    "13d": Snowy,
    "13n": Snowy,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);

      if (!response.ok) {
        // Show an alert if the city is not found
        alert("City not found. Please enter a valid city name.");
        return;
      }

      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || Sun;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(
        "An error occurred while fetching the weather data. Please try again."
      );
    }
  };

  const handleSearch = () => {
    search(city);
  };

  return (
    <div className="weather">
      {/* Search Bar Section */}
      <div className="search_bar">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={Search_icon}
          alt="Search"
          width={20}
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Weather Data Section */}
      {weatherData ? (
        <div className="weather_details">
          <img
            src={weatherData.icon}
            alt="Weather Icon"
            className="weather_icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather_data">
            <div className="col">
              <img src={Weather} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={Wind_power} alt="Windspeed" />
              <div>
                <p>{weatherData.windspeed} Km/h</p>
                <span>Windspeed</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
