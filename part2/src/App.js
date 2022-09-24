import { useState } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumbers] = useState('')
    const [filter, setFilter] = useState('')

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
