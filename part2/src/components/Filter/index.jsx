import React from "react"

function Filter({filter, handleFilterChange}) {
    return (
        <>
            <span>filter shown with: </span><input onChange={handleFilterChange} value={filter}></input>
        </>
    )
}

export default Filter
