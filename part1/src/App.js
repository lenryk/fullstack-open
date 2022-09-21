const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    function Header({course}) {
        return <h1>{course}</h1>
    }

    function Part({part, exercise}) {
        return <p>{part} {exercise}</p>
    }

    function Content({part1, exercises1, part2, exercises2, part3, exercises3}) {
        return (
            <>
                <Part part={part1} exercise={exercises1} />
                <Part part={part2} exercise={exercises2} />
                <Part part={part3} exercise={exercises3} />
            </>
            )
    }

    function Total({exercises1, exercises2, exercises3}) {
        return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    }

    return (
        <div>
            <Header course={course} />
            <Content part1={parts[0].name} exercises1={parts[0].exercises} part2={parts[1].name} exercises2={parts[1].exercises} part3={parts[2].name} exercises3={parts[2].exercises}/>
            <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />
        </div>
    )
}

export default App
