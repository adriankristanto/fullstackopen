import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(g => g + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(n => n + 1)
  }
  const handleBadClick = () => {
    setBad(b => b + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App