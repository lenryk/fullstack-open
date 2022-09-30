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

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length} people <br/> ${new Date()}`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id).then((person) => {
        person ? response.json(person) : response.status(404).end()
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const newPerson = {
        name: body.name,
        number: body.number,
    }

    console.log(request.params.id)
    Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

