const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
)

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `Phonebook has info for ${persons.length} people <br/> ${new Date()}`
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  Person.find({ name })
    .then((resp) => {
      if (resp[0]?.name === name) {
        response
          .status(400)
          .json({ error: 'name already exists use PUT to update' })
      } else {
        const newPerson = new Person({
          name,
          number,
        })

        newPerson
          .save()
          .then((savedPerson) => {
            response.json(savedPerson)
          })
          .catch((error) => next(error))
      }
    })
    .catch((err) => console.log(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const newPerson = {
    name,
    number,
  }

  Person.findByIdAndUpdate(request.params.id, newPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
