import React from "react"

function Persons({filter, persons}) {
    return filter === '' ? persons.map((({name, number, id}) => <p key={id}>{name} {number}</p>)) :
        persons.filter(({name}) => {
            return name.toLowerCase().includes(filter)
        }).map((({name, number, id}) => <p key={id}>{name} {number}</p>))
}

export default Persons
