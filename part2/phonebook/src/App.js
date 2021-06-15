import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Display from "./components/Display";
import PhonebookForm from "./components/PhonebookForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleDuplicate = (duplicatePerson) => {
    personService
      .updatePerson(duplicatePerson.id, {
        ...duplicatePerson,
        number: newNumber,
      })
      .then((updatedPerson) =>
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        )
      )
      .catch((error) => {
        alert(`${duplicatePerson.name} was already deleted from server.`);
        console.log(error);
        setPersons(
          persons.filter((person) => person.id !== duplicatePerson.id)
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicatePerson = persons.find((person) => person.name === newName);
    // if the person has already been added to the phonebook, create an alert
    if (duplicatePerson) {
      window.confirm(
        `${duplicatePerson.name} is already added to phonebook. Replace the old number with a new one?`
      ) && handleDuplicate(duplicatePerson);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .createPerson(newPerson)
        .then((createdPerson) => setPersons(persons.concat(createdPerson)));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (type) => {
    return {
      name: (event) => setNewName(event.target.value),
      number: (event) => setNewNumber(event.target.value),
      filter: (event) => {
        setNewFilter(event.target.value);
      },
    }[type];
  };

  const handleDelete = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).catch((error) => {
        alert(`${person.name} was already deleted from server.`);
        console.log(error);
        setPersons(persons.filter((p) => p.id !== person.id));
      }); // returns empty JSON object
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  const filteredPersons = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleChange={handleChange} />
      <h2>add a new</h2>
      <PhonebookForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Display filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
