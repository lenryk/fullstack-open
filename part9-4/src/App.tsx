const App = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartBaseDesc extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartBaseDesc {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartBaseDesc {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
  ];

  function Header({ courseName }: { courseName: string }) {
    return <h1>{courseName}</h1>;
  }

  function Part({ part }: { part: CoursePart }) {
    switch (part.type) {
      case "normal":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>{part.description}</p>
          </>
        );
      case "groupProject":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>project exercises {part.groupProjectCount}</p>
          </>
        );
      case "submission":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>{part.description}</p>
            <p>{part.exerciseSubmissionLink}</p>
          </>
        );
    }
  }

  function Content({ courseParts }: { courseParts: Array<CoursePart> }) {
    return (
      <>
        {" "}
        {courseParts.map((part) => {
          return <Part part={part} key={part.name} />;
        })}
      </>
    );
  }

  function Total({ courseParts }: { courseParts: Array<CoursePart> }) {
    return (
      <p>
        Number of exercises:{" "}
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
