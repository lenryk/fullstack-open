import React from "react"

function Person({name, number, onClick}) {
    return (
        <>
            <p>{name} {number} <button onClick={onClick}> delete</button></p>
        </>
    )
}

export default Person
