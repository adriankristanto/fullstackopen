import axios from 'axios'
import { useEffect, useState } from "react";


const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const CountryDisplay = ({country, show: open}) => {
    const [show, setShow] = useState(open)
    const [temperature, setTemperature] = useState(null)
    const [iconName, setIconName] = useState(null)
    const [iconAlt, setIconAlt] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)

    const [lat, lon] = country.latlng

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
            .then(response => response.data)
            .then(data => {
                setTemperature(data.main.temp)
                setWindSpeed(data.wind.speed)
                if (data.weather.length > 0) {
                    setIconName(data.weather[0].icon)
                    setIconAlt(data.weather[0].main)
                }
            })
    }, [country])

    const handleShowClick = () => {
        setShow(prev => !prev)
    }

    return ( 
        <>
            <div>
                {country.name.common} <button onClick={handleShowClick}>{show ? "Hide" : "Show"}</button>
            </div>
            {show && <div>
                <h1>{country.name.official} ({country.name.common})</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => {
                        return <li key={language}>{language}</li>
                    })}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
                <h2>Weather in {country.name.common}</h2>
                {temperature && <p>Temperature {temperature} Celcius</p>}
                {iconName && iconAlt && <img src={`https://openweathermap.org/payload/api/media/file/${iconName}.png`} alt={iconAlt}/>}
                {windSpeed && <p>Wind speed {windSpeed} m/s</p>}
            </div>}
        </>
    );
}
 
export default CountryDisplay;