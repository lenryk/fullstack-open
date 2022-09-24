import { useState } from 'react'

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

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with: <input onChange={(event) =>setFilter(event.target.value.toLowerCase())} value={filter}></input>
            <h2>add a new</h2>
            <form onSubmit={handleAdd}>
                <div>
                    name: <input onChange={(event) => setNewName(event.target.value)} value={newName}/>
                </div>
                <div>
                    number: <input onChange={(event) => setNewNumbers(event.target.value)} value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filter === '' ? persons.map((({name, number, id}) => <p key={id}>{name} {number}</p>)) :
                persons.filter(({name}) => {
                    return name.toLowerCase().includes(filter)
                }).map((({name, number, id}) => <p key={id}>{name} {number}</p>))}
        </div>
    )
}

export default App
