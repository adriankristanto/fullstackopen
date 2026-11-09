import { useState } from 'react'
import PersonFilter from './PersonFilter'
import PersonForm from './PersonForm'
import PersonDisplay from './PersonDisplay'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleAddPersonSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(prev => prev.concat({name: newName, number: newNumber, id: prev.length + 1}))
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