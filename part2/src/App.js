import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumbers] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(({data}) => setPersons(data))
    }, [])

    function handleAdd(event) {
        event.preventDefault()

        if (persons.find(obj => obj.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons([...persons, {name:newName, number: newNumber}])
        }
    }

    function handleNameChange(event) {
        setNewName(event.target.value)
    }

    function handleNumberChange(event) {
        setNewNumbers(event.target.value)
    }

    function handleFilterChange(event) {
        setFilter(event.target.value.toLowerCase())
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <h2>add a new</h2>
            <PersonForm handleAdd={handleAdd}
                       handleNameChange={handleNameChange}
                       handleNumberChange={handleNumberChange}
                       newName={newName}
                       newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons filter={filter} persons={persons} />
        </div>
    )
}

export default App
