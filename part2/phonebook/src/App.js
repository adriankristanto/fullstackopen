import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Display from "./components/Display";
import PhonebookForm from "./components/PhonebookForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // if the person has already been added to the phonebook, create an alert
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
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
      <Display filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
