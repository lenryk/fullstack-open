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

test('adds blog to database', async () => {
    await api.post('/api/blogs').send(helper.newBlog)
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(3)
    expect(response.body.at(-1).title).toStrictEqual('my new blog post')
})

test('checks if likes property is present', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]['likes']).not.toStrictEqual(0)
})

test('rejects blog with missing title or url props', async () => {
    const response = await api.post('/api/blogs').send(helper.invalidNewBlog)

    expect(response.status).toBe(400)
})


afterAll(() => {
    mongoose.connection.close()
})
