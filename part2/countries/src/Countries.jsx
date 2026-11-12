import CountryDisplay from "./CountryDisplay";

const Countries = ({countries}) => {
    return ( 
        <div>
        {
          countries.length > 10 ? 
            <div>Too many matches, specify another filter</div> :
          (<div>
              {
                countries
                  .map(country => {
                    return (
                      // force re-render using key -- we cannot just pass in show={countries.length === 1} here and use it as the initial value for the state in CountryDisplay
                      // for example, when we type in "f", finland will appear, but since countries.length !== 1, show=false -> the initial value for the state in country display
                      // later on, we type "fin", which won't update the initial value unless the component is re-rendered
                      <CountryDisplay key={`${country.cca2}-${countries.length === 1}`} country={country} show={countries.length === 1} />
                    )
                  })
              }
          </div>)
        }
      </div>
     );
}
 
export default Countries;