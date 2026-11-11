const PersonDisplay = ({
    persons,
    searchFilter,
    onDelete
}) => {
    return (
        <table>
            {persons
              .filter(
                person => 
                  person.name.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map(
                (person) => 
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td>
                        <button onClick={onDelete(person.id)}>
                            Delete
                        </button>
                        </td>
                    </tr>
              )}
        </table>
        )
}
 
export default PersonDisplay;