import React from "react"
import Person from "../Person"

function Persons({filter, persons, handleDelete}) {

    return persons ? filter === '' ? persons.map((({name, number, id}) => <Person key={id} name={name} number={number} onClick={() => handleDelete({name, id})}/>)) :
        persons.filter(({name}) => {
            return name.toLowerCase().includes(filter)
        }).map((({name, number, id}) =>  <Person key={id} name={name} number={number} onClick={() => handleDelete({name, id})} />)) : <p>Loading...</p>
}

export default Persons
