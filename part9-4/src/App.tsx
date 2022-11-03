const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  function Header({ courseName }: { courseName: string }) {
    return <h1>{courseName}</h1>;
  }

  type courseParts = {
    name: string;
    exerciseCount: number;
  };

  function Content({ courseParts }: { courseParts: Array<courseParts> }) {
    return (
      <>
        {" "}
        {courseParts.map((part) => {
          return (
            <p key={part.exerciseCount}>
              {part.name} {part.exerciseCount}
            </p>
          );
        })}
      </>
    );
  }

  function Total({ courseParts }: { courseParts: Array<courseParts> }) {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
