import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumbers] = useState('')

    function handleAdd(event) {
        event.preventDefault()

        if (persons.find(obj => obj.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons([...persons, {name:newName, number: newNumber}])
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleAdd}>
                <div>
                    name: <input onChange={(event) => setNewName(() => event.target.value)} value={newName}/>
                </div>
                <div>
                    number: <input onChange={(event) => setNewNumbers(() => event.target.value)} value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((({name, number}, id) => <p key={id}>{name} {number}</p>))}
        </div>
    )
}

export default App
