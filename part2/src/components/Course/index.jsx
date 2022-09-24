import React from "react";

function Course({course}) {

    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(({name, exercises, id}) => {
                return <p key={id}>{name} {exercises}</p>
            })}
        </>
    )
}

export default Course
