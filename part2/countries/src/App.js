import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log("error", error));
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const filteredCountries = input
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(input.toLowerCase())
      )
    : countries;

  return (
    <div>
      find countries: <input value={input} onChange={handleChange} />
      <br />
      {
        // * when there are more than 10 countries, error
        filteredCountries.length > 10 &&
          "Too many matches, specify another filter"
      }
      {
        // * when there are less than 10 (but greater than 1) countries, only show the button
        filteredCountries.length <= 10 &&
          filteredCountries.length > 1 &&
          filteredCountries.map((country) => (
            <Country key={country.name} country={country} detailed={false} />
          ))
      }
      {
        // * when there is only one country, show the button & details
        filteredCountries.length === 1 && (
          <Country country={filteredCountries[0]} detailed={true} />
        )
      }
    </div>
  );
};

export default App;
