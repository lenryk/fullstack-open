import React from "react"

function Filter({filter, handleFilterChange}) {
    return (
        <>
            <span>find countries: </span><input onChange={handleFilterChange} value={filter}></input>
        </>
    )
}

export default Filter
