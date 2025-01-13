import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveWeather = ({ apiKey, unit, updateBackgroundImage }) => {
  const [liveWeather, setLiveWeather] = useState(null);

  useEffect(() => {
    const fetchLiveWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather`,
              {
                params: {
                  lat: latitude,
                  lon: longitude,
                  units: unit === "C" ? "metric" : "imperial",
                  appid: apiKey,
                },
              }
            );
            setLiveWeather(response.data);
            updateBackgroundImage(response.data.weather[0]?.description); // Update the background
          } catch (error) {
            console.error("Error fetching live weather:", error);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    };

    fetchLiveWeather();
  }, [apiKey, unit, updateBackgroundImage]);

  return liveWeather ? (
    <div className="bg-white bg-opacity-50 rounded-lg p-4 shadow-lg w-full max-w-md mt-8">
      <h2 className="text-2xl font-bold text-center">
        Live Weather: {liveWeather.name}
      </h2>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-lg">
            Temperature: {liveWeather.main.temp.toFixed(1)}°{unit}
          </p>
          <p className="text-lg">Humidity: {liveWeather.main.humidity}%</p>
          <p className="text-lg">
            Wind Speed: {liveWeather.wind.speed} {unit === "C" ? "m/s" : "mph"}
          </p>
        </div>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${liveWeather.weather[0]?.icon}@2x.png`}
            alt={liveWeather.weather[0]?.description}
            className="w-16 h-16"
          />
          <p className="capitalize">{liveWeather.weather[0]?.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-lg">Fetching live weather...</p>
  );
};

export default LiveWeather;
