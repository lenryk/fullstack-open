const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else if (request.method === "GET") {

    } else {
        return response.status(401).json({message: 'missing token'})
    }
    next()
}

userExtractor = async (request, response, next) => {
    let decodedToken
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch {
        return response.status(401).json({message: 'invalid token'})
    }

    request.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
