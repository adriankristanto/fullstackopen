import axios from 'axios'
import { useMemo } from 'react'
import { useState, useEffect } from "react"
import Countries from './Countries'

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api"

const App = () => {
  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])

  const filteredCountries = useMemo(() => {
    return countries.filter(
    country => 
      country.name.common.toLowerCase().includes(countryInput.toLowerCase()) || 
      country.name.official.toLowerCase().includes(countryInput.toLowerCase())
  )}, [countries, countryInput])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all`)
      .then(response => response.data)
      .then(data => {
        setCountries(data)
      })
  }, [])

  const handleCountryInputChange = (event) => {
    setCountryInput(event.target.value)
  } 

  return ( 
    <div>
      <div>
      find countries <input value={countryInput} 
                            onChange={handleCountryInputChange}/>
      </div>
      <Countries countries={filteredCountries}/>
    </div>
  );
}
 
export default App;