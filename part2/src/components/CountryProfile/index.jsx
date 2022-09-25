import React, {useEffect, useState} from "react"
import axios from "axios"

function CountryProfile({data, setCountry, country}) {
    const [weather, setWeather] = useState()

    data = data.filter(({name: {common}}) => common.toLowerCase().includes(country))

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].capitalInfo.latlng[0]}&lon=${data[0].capitalInfo.latlng[1]}&appid=${apiKey}`).then(({data}) => setWeather(data))
    }, [country])

    return weather ? (
        <>
            <h1>{data[0].name.common}</h1>
            <p>capital: {data[0].capital[0]}</p>
            <p>area: {data[0].area}</p>
            <strong>languages:</strong>
            <br/><br/>
            {Object.values(data[0].languages).map((language) => <li key={language}>{language}</li>)}
            <br/>
            <img alt="flag" src={data[0].flags.png}/>
            <h1>Weather in {data[0].capital[0]}</h1>
            <p>temperature {((weather.main.temp) - 273.15).toFixed(2)} celcius</p>
            <img alt="weather" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
            <p>wind {weather.wind.speed} m/s</p>
            {country && <button onClick={() => setCountry('')}>go back</button>}
        </>
    ) : <p>Loading...</p>
}

export default CountryProfile
