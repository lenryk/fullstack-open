import React from "react";
import Sum from "../Sum"

function Course({course}) {
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(({name, exercises, id}) => {
                return <p key={id}>{name} {exercises}</p>
            })}
            <Sum course={course} />
        </>
    )
}

export default Course
