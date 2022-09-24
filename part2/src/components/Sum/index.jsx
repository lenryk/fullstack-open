import React from "react";

function Sum({course}) {
    return <p>total of {course.parts.reduce((prev, current) => prev+current.exercises, 0)} exercises</p>
}

export default Sum
