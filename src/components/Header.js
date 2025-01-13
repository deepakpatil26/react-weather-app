import React from "react";
import logo from "../assets/weather-logo.webp"; // Adjust path if necessary

const Header = () => {
  return (
    <div className="w-full bg-gray-300 text py-4 px-6 flex items-center rounded-lg mt-4 shadow-md">
      <img
        src={logo}
        alt="Weather App Logo"
        className="w-12 h-12 mr-4 rounded-full"
      />
      <h1 className="text-2xl font-bold">Weather App</h1>
    </div>
  );
};

export default Header;
