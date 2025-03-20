import React from 'react';

const WeatherInfo = ({ weather, unit, setUnit }) => {
  if (!weather) return null;

  const { name, main, weather: weatherDetails, wind, sys } = weather;
  const description = weatherDetails[0]?.description;
  const temperatureInCelsius = main?.temp; // Store as Celsius
  const temperature =
    unit === 'C' ? temperatureInCelsius : (temperatureInCelsius * 9) / 5 + 32; // Convert to Fahrenheit when needed

  const humidity = main?.humidity;
  const windSpeed = wind?.speed;
  const sunrise = new Date(sys?.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(sys?.sunset * 1000).toLocaleTimeString();

  return (
    <div className='mt-8 p-6 rounded-lg bg-white/50 shadow-md max-w-lg w-full text-center text-gray-800'>
      <h2 className='text-2xl font-bold mb-4'>{name}</h2>
      <p className='text-lg capitalize'>{description}</p>
      <p className='text-4xl font-semibold mt-2'>
        {temperature.toFixed(2)}° {unit === 'C' ? 'Celsius' : 'Fahrenheit'}
      </p>
      <button
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <div className='mt-6 text-sm'>
        <p>Humidity: {humidity}%</p>
        <p>
          Wind Speed: {windSpeed} {unit === 'C' ? 'm/s' : 'mph'}
        </p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
