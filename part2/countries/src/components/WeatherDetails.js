import React from "react";

const WeatherDetails = ({ country, currentWeather }) => {
  return currentWeather ? (
    <>
      <h3>{`Weather in ${country.capital}`}</h3>
      <strong>temperature:</strong> {`${currentWeather.temperature} Celcius`}
      <br />
      <img
        src={currentWeather.weather_icons[0]}
        alt={`${country.capital}'s weather`}
        style={{ width: "200px" }}
      />
      <br />
      <strong>wind:</strong>{" "}
      {`${currentWeather.wind_speed} mph direction ${currentWeather.wind_dir}`}
    </>
  ) : null;
};

export default WeatherDetails;
