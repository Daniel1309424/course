const Total = (props) => {
    const totalExercises = props.parts.reduce(
      (sum, part) => sum + part.exercises, 0
    ) 
  
    return (
      <div>
        <p>Number of Exercises: {totalExercises}</p>
      </div>
    );
  };
  
  export default Total;
  