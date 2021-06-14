import React from "react";

const Filter = (props) => {
  return (
    <>
      filter shown with{" "}
      <input value={props.newFilter} onChange={props.handleChange("filter")} />
    </>
  );
};

export default Filter;
