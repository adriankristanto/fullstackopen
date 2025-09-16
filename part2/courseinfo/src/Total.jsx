const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts.reduce((acc, { exercises }) => acc + exercises, 0)}</p>
  );
}

export default Total;
