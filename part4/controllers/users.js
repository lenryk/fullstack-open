const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('express-async-errors')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({message: 'invalid username & password'})
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({message: 'password & username must be at least 3 chars'})
    }

    const usernameTaken = await User.find({username})

    if(usernameTaken) {
        return response.status(400).json({message: 'username has already been taken'})
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter
