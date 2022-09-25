import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Results from "./components/Results"

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(({data}) => setCountries(data))
    }, [])

    useEffect(() => {
        setFilteredData(countries.filter(({name:{common}}) => common.toLowerCase().includes(filter)))
    }, [countries, filter])

    function handleFilterChange(event) {
        setFilter(event.target.value.toLowerCase())
    }

    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <Results data={filteredData} filter={filter}/>
        </div>
    )
}

export default App
