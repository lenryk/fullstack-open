import React from "react";

function Sum({course}) {
    return <strong>total of {course.parts.reduce((prev, current) => prev+current.exercises, 0)} exercises </strong>
}

export default Sum
