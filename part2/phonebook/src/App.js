import React, { useState } from "react";
import Filter from "./components/Filter";
import Display from "./components/Display";
import PhonebookForm from "./components/PhonebookForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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
