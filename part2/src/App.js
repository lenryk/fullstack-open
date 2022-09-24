import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    function handleAdd(event) {
        event.preventDefault()
        setPersons([...persons, {name:newName}])
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleAdd}>
                <div>
                    name: <input onChange={(event) => setNewName(() => event.target.value)} value={newName}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(((person, id) => <p key={id}>{person.name}</p>))}
        </div>
    )
}

export default App
