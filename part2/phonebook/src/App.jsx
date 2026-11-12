import { useEffect, useState } from 'react'
import PersonFilter from './PersonFilter'
import PersonForm from './PersonForm'
import PersonDisplay from './PersonDisplay'
import personService from './personService'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService 
      .getAll()
      .then(
        initialPersons => setPersons(initialPersons)
      )
  }, [])

  const handleNotificationClose = () => {
    setNotification(null)
  }

  const handleAddPersonSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (!found) {
      const newPerson = {name: newName, number: newNumber}
    personService
        .create(newPerson)
        .then(
          createdPerson => {
            setPersons(prev => prev.concat(createdPerson))
            setNotification({
              message: `Added ${newPerson.name}`,
              type: 'success'
            })
            setNewName('')
            setNewNumber('')
          })
      return
    }
    
    if (window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = {...found, number: newNumber}
      personService
        .update(found.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(prev => prev.map(
            person => person.id === returnedPerson.id ? returnedPerson : person
          ))
          setNotification({
            message: `Updated ${found.name}'s entry`,
            type: 'success'
          })
        })
        .catch(error => {
          setNotification({
            message: error.message,
            type: 'error'
          })
        })
    }
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

  const handleDeletePerson = id => () => {
    const found = persons.find(person => person.id === id)
    if (found && window.confirm(`Delete ${found.name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => setPersons(prev => prev.filter(person => person.id !== returnedPerson.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={handleNotificationClose} 
      />}
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
      <PersonDisplay persons={persons} searchFilter={search} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App