/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import WeatherInfo from "./components/WeatherInfo";
import LiveWeather from "./components/LiveWeather";
import sunny from "./assets/sunny.jpg";
import cloudy from "./assets/cloudy.jpg";
import rainy from "./assets/rainy.jpg";
import snowy from "./assets/snowy.jpg";
import stormy from "./assets/stormy.jpg";
import foggy from "./assets/foggy.jpg";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C"); // Default to Celsius
  const [searchMode, setSearchMode] = useState(false); // Track if user is searching for a city
  const [backgroundImage, setBackgroundImage] = useState(""); // Background image state

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // Function to determine background image based on weather description
  const updateBackgroundImage = (description) => {
    if (!description) return;

    const desc = description.toLowerCase();

    if (desc.includes("clear")) setBackgroundImage(sunny);
    else if (desc.includes("cloud")) setBackgroundImage(cloudy);
    else if (desc.includes("rain")) setBackgroundImage(rainy);
    else if (desc.includes("snow")) setBackgroundImage(snowy);
    else if (desc.includes("thunderstorm")) setBackgroundImage(stormy);
    else if (
      desc.includes("fog") ||
      desc.includes("mist") ||
      desc.includes("haze")
    )
      setBackgroundImage(foggy); // Add a foggy image
    else setBackgroundImage(cloudy); // Default fallback
  };

  const handleSearch = async () => {
    setSearchMode(true); // Set search mode to true when user searches
    try {
      let response;

      if (!isNaN(query)) {
        // If the query is numeric, search by pincode (e.g., "110001")
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              zip: `${query},in`, // Replace 'in' with your desired country code (e.g., 'us' for the USA)
              units: unit === "C" ? "metric" : "imperial",
              appid: apiKey,
            },
          }
        );
      } else {
        // If the query is not numeric, search by city name (e.g., "London")
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: query,
              units: unit === "C" ? "metric" : "imperial",
              appid: apiKey,
            },
          }
        );
      }

      setWeather(response.data);
      updateBackgroundImage(response.data.weather[0]?.description);
    } catch (error) {
      alert("City or pincode not found");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-blue-50 px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      {!searchMode && (
        <LiveWeather
          apiKey={apiKey}
          unit={unit}
          updateBackgroundImage={updateBackgroundImage}
        />
      )}
      <Search query={query} setQuery={setQuery} handleSearch={handleSearch} />
      {searchMode && (
        <WeatherInfo weather={weather} unit={unit} setUnit={setUnit} />
      )}
    </div>
  );
};

export default App;
