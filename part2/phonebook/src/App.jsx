import { useEffect, useState } from 'react'
import PersonFilter from './PersonFilter'
import PersonForm from './PersonForm'
import PersonDisplay from './PersonDisplay'
import personService from './personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService 
      .getAll()
      .then(
        initialPersons => setPersons(initialPersons)
      )
  }, [])

  const handleAddPersonSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {name: newName, number: newNumber}
    personService
      .create(newPerson)
      .then(
        createdPerson => setPersons(prev => prev.concat(createdPerson))
      )
    setNewName('')
    setNewNumber('')
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter value={search} onChange={handleSearchInputChange} />
      <h2>Add a new</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        onNameChange={handleNameInputChange}
        onNumberChange={handleNumberInputChange}
        onSubmit={handleAddPersonSubmit}
      />
      <h2>Numbers</h2>
      <PersonDisplay persons={persons} searchFilter={search} />
    </div>
  )
}

export default App