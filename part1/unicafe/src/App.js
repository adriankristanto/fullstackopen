import React, { useState } from "react";

const SectionHeader = (props) => <h1>{props.text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>
      {props.value} {props.text === "positive" && "%"}
    </td>
  </tr>
);

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <Statistic text={"good"} value={props.good} />
        <Statistic text={"neutral"} value={props.neutral} />
        <Statistic text={"bad"} value={props.bad} />
        <Statistic text={"all"} value={props.total} />
        <Statistic text={"average"} value={props.average} />
        <Statistic text={"positive"} value={props.positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickHandlerFactory = (type) => {
    return {
      good: () => setGood(good + 1),
      neutral: () => setNeutral(neutral + 1),
      bad: () => setBad(bad + 1),
    }[type];
  };

  // since re-render will execute everything inside of this function, the following can be done
  // I think the following can't be done if class components are used
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <>
      <SectionHeader text="give feedback" />
      <Button handleClick={clickHandlerFactory("good")} text="good" />
      <Button handleClick={clickHandlerFactory("neutral")} text="neutral" />
      <Button handleClick={clickHandlerFactory("bad")} text="bad" />
      <SectionHeader text="statistics" />
      {good || neutral || bad ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      ) : (
        "No feedback given"
      )}
    </>
  );
};

export default App;
