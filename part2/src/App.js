import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import api from "./hooks/backend"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState({message: '', type: ''})

    useEffect(() => {
        api.listAll()
            .then((data) => setPersons(data))
    }, [])

    function handleAdd(event) {
        event.preventDefault()

        const {id} = persons.find(obj => obj.name === newName) ?? 0

        if (id) {
            if (window.confirm(`${newName} is already added to phonebook, replace old number with the new one?`)) {
                api.updatePerson(id, {name: newName, number: newNumber, id}).then(() => {
                    setMessage({message:`${newName} was successfully updated!`, type: 'green'})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                }).catch(() => {
                    setMessage({message:`Information for ${newName} has already been deleted from the server!`, type: 'red'})
                    setTimeout(() => {
                        setMessage({message: '', type: ''})
                    }, 5000)
                }).finally(() => api.listAll().then((data) => setPersons(data)))
            }
        } else {
            api.addPerson({name:newName, number: newNumber}).then(() => {
                api.listAll().then((data) => setPersons(data))
                setMessage({message:`${newName} was successfully added!`, type: 'green'})
                setTimeout(() => {
                    setMessage({message: '', type: ''})
                }, 5000)
                setNewName('')
                setNewNumber('')
            })
        }
    }

    function handleDelete({name, id}) {
        if (window.confirm(`Do you really want to delete ${name}?`)) {
            api.deletePerson(id).then(() => {
                api.listAll().then((data) => setPersons(data))
                setMessage({message:`${name} was successfully deleted!`, type: 'red'})
                setTimeout(() => {
                    setMessage({message: '', type: ''})
                }, 5000)
            })
        }
    }

    function handleNameChange(event) {
        setNewName(event.target.value)
    }

    function handleNumberChange(event) {
        setNewNumber(event.target.value)
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
            <Notification data={message} />
            <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
        </div>
    )
}

export default App
