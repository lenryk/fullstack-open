import React from "react"

function Results({data, filter}) {

    if(data.length === 0) {
        return <p>Loading...</p>
    } else if (data.length === 1) {
        return (
            <>
                <h1>{data[0].name.common}</h1>
                <p>capital: {data[0].capital[0]}</p>
                <p>area: {data[0].area}</p>
                <strong>languages:</strong>
                <br/><br/>
                {Object.values(data[0].languages).map((language) => <li>{language}</li>)}
                <br/><br/>
                <img alt="flag" src={data[0].flags.png} />
            </>

        )
    } else {
        return data.length > 10 ? <p>Too many matches, specify another filter</p>
            : data.filter(({name:{common}}) => common.toLowerCase().includes(filter)).map(({name: {common}}) => <p key={common}>{common}</p>)
    }
}

export default Results
