import React from "react";
import Person from "./Person";

const Display = (props) => {
  return (
    <>
      {props.filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={props.handleDelete}
        />
      ))}
    </>
  );
};

export default Display;
