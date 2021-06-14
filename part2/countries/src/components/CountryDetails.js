import React from "react";

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      capital {country.capital}
      <br />
      population {country.population}
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name}'s flag`}
        style={{ width: "200px" }}
      />
    </>
  );
};

export default CountryDetails;
