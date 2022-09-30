const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config();
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br/> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {

    Person.findById(request.params.id).then((person) => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'missing name'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'missing number'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000),
    })

    newPerson.save((savedPerson) => {
        response.json(savedPerson)
    })

})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

