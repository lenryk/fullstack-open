import React from "react"

function CountryProfile({data, setCountry, country}) {

    data = data.filter(({name: {common}}) => common.toLowerCase().includes(country))

    return (
        <>
            <h1>{data[0].name.common}</h1>
            <p>capital: {data[0].capital[0]}</p>
            <p>area: {data[0].area}</p>
            <strong>languages:</strong>
            <br/><br/>
            {Object.values(data[0].languages).map((language) => <li key={language}>{language}</li>)}
            <br/><br/>
            <img alt="flag" src={data[0].flags.png}/>
            <br/><br/>
            {country && <button onClick={() => setCountry('')}>go back</button>}
        </>
    )
}

export default CountryProfile
