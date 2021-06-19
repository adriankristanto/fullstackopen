import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Display from "./components/Display";
import PhonebookForm from "./components/PhonebookForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNotification = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => setNotification({ message: "", status: "" }), 5000);
  };

  const handleDuplicate = (duplicatePerson) => {
    personService
      .updatePerson(duplicatePerson.id, {
        ...duplicatePerson,
        number: newNumber,
      })
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );
        handleNotification(`Updated ${updatedPerson.name}'s number`, "success");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleNotification(error.response.data.error, "error");
        } else {
          handleNotification(
            `${duplicatePerson.name} was already deleted from server.`,
            "error"
          );
          setPersons(
            persons.filter((person) => person.id !== duplicatePerson.id)
          );
        }
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
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          handleNotification(`Added ${createdPerson.name}`, "success");
        })
        .catch((error) => {
          handleNotification(error.response.data.error, "error");
        });
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
      personService
        .deletePerson(person.id)
        .then((_) => {
          handleNotification(`Deleted ${person.name}`, "success");
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((_) => {
          handleNotification(
            `${person.name} was already deleted from server.`,
            "error"
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        }); // returns empty JSON object
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
      <Notification notification={notification} />
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
