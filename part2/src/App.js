import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import api from "./hooks/backend"

const App = () => {
    const [persons, setPersons] = useState()
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumbers] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        api.listAll()
            .then((data) => setPersons(data))
    }, [])

    function handleAdd(event) {
        event.preventDefault()

        const {id} = persons.find(obj => obj.name === newName)

        if (id) {
            if (window.confirm(`${newName} is already added to phonebook, replace old number with the new one?`)) {
                api.updatePerson(id, {name: newName, number: newNumber, id}).then(() => {
                    api.listAll().then((data) => setPersons(data))
                    window.alert('Person updated!')
                })
            }
        } else {
            api.addPerson({name:newName, number: newNumber}).then(() => console.log('added'))
        }
    }

    function handleDelete(person) {
        if (window.confirm(`Do you really want to delete ${person.name}?`)) {
            api.deletePerson(person.id).then(() => {
                api.listAll().then((data) => setPersons(data))
                window.alert('Person deleted!')
            })
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
            <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
        </div>
    )
}

export default App
