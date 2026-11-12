import CountryDisplay from "./CountryDisplay";

const Countries = ({countries}) => {
    const totalCountries = countries.length

    return ( 
        <div>
        {
          totalCountries > 10 ? 
            <div>Too many matches, specify another filter</div> :
          (<div>
              {
                countries
                  .map(country => {
                    return (
                      <CountryDisplay key={country.cca2} country={country} show={false} />
                    )
                  })
              }
          </div>)
        }
      </div>
     );
}
 
export default Countries;