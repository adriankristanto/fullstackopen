import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({course}) => {
    const totalExercises = course.parts.reduce((acc, curr) => acc + curr.exercises, 0)

    return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          totalExercises
        }
      />
    </div>
  )
}
 
export default Course;