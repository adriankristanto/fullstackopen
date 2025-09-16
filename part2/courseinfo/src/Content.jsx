import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }) => {
        return <Part key={name} part={name} exercises={exercises} />
      })}
      <Total parts={parts} />
    </>
  );
}

export default Content;
