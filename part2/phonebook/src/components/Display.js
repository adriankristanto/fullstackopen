import React from "react";
import Person from "./Person";

const Display = (props) => {
  return (
    <>
      {props.filteredPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

export default Display;
