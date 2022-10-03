const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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

module.exports = blogsRouter
