import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const handlerFactory = (type) => {
    return {
      next: () => setSelected(Math.floor(Math.random() * anecdotes.length)),
      vote: () =>
        setVotes(
          [...votes].map((vote, index) =>
            index === selected ? vote + 1 : vote
          )
        ),
    }[type];
  };

  const maxIndex = votes.reduce(
    (maxIndex, vote, index, array) =>
      vote > array[maxIndex] ? index : maxIndex,
    0
  );

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      {`has ${votes[selected]} votes.`}
      <br />
      <button onClick={handlerFactory("vote")}>vote</button>
      <button onClick={handlerFactory("next")}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
    </div>
  );
};

export default App;
