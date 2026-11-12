import { useState } from "react";

const CountryDisplay = ({country, show: open}) => {
    const [show, setShow] = useState(open)

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
            </div>}
        </>
    );
}
 
export default CountryDisplay;