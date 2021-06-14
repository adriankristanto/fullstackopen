import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetails";
import WeatherDetails from "./WeatherDetails";

const Country = ({ country, detailed }) => {
  const [showView, setShowView] = useState(detailed);
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleClick = () => setShowView(!showView);

  useEffect(() => {
    if (showView) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
        )
        .then((response) => {
          setCurrentWeather(response.data.current);
        });
    }
  }, [showView, country.capital]);

  return (
    <div>
      <div>
        {country.name} <button onClick={handleClick}>show</button>
      </div>{" "}
      {showView && (
        <>
          <CountryDetails country={country} />
          <WeatherDetails country={country} currentWeather={currentWeather} />
        </>
      )}
    </div>
  );
};

export default Country;
