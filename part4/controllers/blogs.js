const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(allBlogs)
})

blogsRouter.post('/', async (request, response) => {
    if(!request.token) {
        return response.status(401).json({message: 'not authorized'})
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const { url, title, author, likes} = request.body

    const newBlog = new Blog({
        url,
        title,
        author,
        likes,
        user: user.id
    })

    if (title && url) {
        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

        response.status(201).json(savedBlog)
    } else {
        response.status(400).json({message: 'missing content'})
    }
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)

    response.status(200).json(blog)
})

blogsRouter.post('/:id', async(request, response) => {
    await Blog.findByIdAndDelete(request.params.id)

    response.status(200).json({message: 'blog deleted'})
})

blogsRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)

    response.status(200).json({message: 'blog updated'})
})

module.exports = blogsRouter
