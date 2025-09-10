import { useState } from "react";

const App = () => {
  const initialAnecdotes = [
    {text: 'If it hurts, do it more often.', vote: 0},
    { text: 'Adding manpower to a late software project makes it later!', vote: 0},
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0},
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0},
    { text: 'Premature optimization is the root of all evil.', vote: 0},
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0},
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote: 0},
    { text: 'The only way to go fast, is to go well.', vote: 0}
  ]
   
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [selected, setSelected] = useState(0)

  const handleNextAnecdoteButtonClick = () => {
    const r = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(r)
  }

  const handleVoteButtonClick = () => {
    setAnecdotes(prevAnecdotes => {
      return prevAnecdotes.map((anecdote, i) => {
        return i === selected ? {
          ...anecdote, vote: anecdote.vote + 1
        } : anecdote
      })
    })
  }

  const anecdoteWithMostVotes = anecdotes.reduce((acc, curr) => {
    return curr.vote > acc.vote ? curr : acc
  })

  return ( 
    <>
      <div>
        {anecdotes[selected].text} 
      </div>
      <button onClick={handleVoteButtonClick}>vote</button>
      <button onClick={handleNextAnecdoteButtonClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdoteWithMostVotes.text} has {anecdoteWithMostVotes.vote} votes</p>
    </>
   );
}
 
export default App;