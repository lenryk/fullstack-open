import React, {useState} from "react"
import CountryProfile from "../CountryProfile"

function Results({data, filter}) {
    const [country, setCountry] = useState('')

    if(data.length === 0) {
        return <p>Loading...</p>
    } else if (data.length === 1 || country) {
        return <CountryProfile data={data} country={country} setCountry={setCountry}/>
    } else {
        return data.length > 10 ? <p>Too many matches, specify another filter</p>
            : data.filter(({name:{common}}) => common.toLowerCase().includes(filter)).map(({name: {common}}) => (
                <div key={common}>
                    <span>{common}</span><button onClick={() => setCountry(common.toLowerCase())}>show</button>
                </div>
            ))
    }
}

export default Results
