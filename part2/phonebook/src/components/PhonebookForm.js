import React from "react";

const PhonebookForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name:{" "}
        <input value={props.newName} onChange={props.handleChange("name")} />
        <br />
        number:{" "}
        <input
          value={props.newNumber}
          onChange={props.handleChange("number")}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PhonebookForm;
