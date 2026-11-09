const PersonDisplay = ({
    persons,
    searchFilter,
}) => {
    return persons
          .filter(
            person => 
              person.name.toLowerCase().includes(searchFilter.toLowerCase())
          )
          .map(
            (person) => 
                <div key={person.name}>
                    {`${person.name} ${person.number}`}
                </div>
          );
}
 
export default PersonDisplay;