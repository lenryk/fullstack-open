const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})

    response.json(allBlogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)

    if (request?.body?.title && request?.body?.url) {
        const newBlogResponse = await newBlog.save()
        response.status(201).json(newBlogResponse)
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
