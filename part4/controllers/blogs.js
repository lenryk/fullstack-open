const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})

    response.json(allBlogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)
    const newBlogResponse = await newBlog.save()

    response.status(201).json(newBlogResponse)
})

module.exports = blogsRouter
