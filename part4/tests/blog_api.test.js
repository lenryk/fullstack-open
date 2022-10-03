const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')

const api = supertest(app)

beforeAll(async () => {
    await Blog.deleteMany({})
    console.log('cleared test DB')

    await helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved blog post')
    })
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(2)
    expect(response.header['content-type']).toContain('application/json')

})

test('blog json object has id property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]['_id']).toBeDefined()
})


afterAll(() => {
    mongoose.connection.close()
})
