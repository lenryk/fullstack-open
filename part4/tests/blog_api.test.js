const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const bcrypt = require('bcrypt')


const api = supertest(app)

beforeAll(async () => {
    await Blog.deleteMany({})
    console.log('cleared test DB')

    await helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved blog post')
    })

    await User.deleteMany({})
    console.log('deleted all users')

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(helper.userDetails.password, saltRounds)

    const newUser = new User({
        ...helper.userDetails,
        passwordHash,
    })

    await newUser.save()
    console.log('new user added')
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(2)
    expect(response.header['content-type']).toContain('application/json')

})

test('blog json object has id property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]['id']).toBeDefined()
})

test('adds blog to database', async () => {
    const authToken = await api.post('/api/login').send(helper.userDetails)

    await api.post('/api/blogs').auth(authToken.body.token, {type: 'bearer'}).send(helper.newBlog)

    const response = await api.get('/api/blogs').auth(authToken.body.token, {type: 'bearer'})

    expect(response.body.length).toBe(3)
    expect(response.body.at(-1).title).toStrictEqual('my new blog post')
})

test('doesnt add a blog if no auth token', async () => {
    const response = await api.post('/api/blogs').send(helper.newBlog)

    expect(response.status).toBe(401)
})

test('checks if likes property is present', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]['likes']).not.toStrictEqual(0)
})

test('rejects blog with missing title or url props', async () => {
    const response = await api.post('/api/blogs').send(helper.invalidNewBlog)

    expect(response.status).toBe(400)
})

test('deletes blog post', async () => {
    const response = await api.get('/api/blogs')

    await api.post(`/api/blogs/${response.body[0]['_id']}`)

    const blogsAfterDelete = await api.get('/api/blogs')

    expect(blogsAfterDelete.body.length).toBe(2)
})

test('updates blog post', async () => {
    const response = await api.get('/api/blogs')

    await api.put(`/api/blogs/${response.body[0]['_id']}`).send(helper.updatedBlogPost)

    const updatedBlog = await api.get(`/api/blogs/${response.body[0]['_id']}`)

    expect(updatedBlog.body.title).toBe('this has been updated')
})

test('cannot create user without valid details', async () => {
    const response = await api.post('/api/users').send(helper.invalidUser)

    expect(response.status).toBe(400)
    expect(response.error.text).toBe('{"message":"password & username must be at least 3 chars"}')
})

test('invalid users are not added to db', async () => {
    await User.deleteMany({})

    await api.post('/api/users').send(helper.invalidUser)

    const response = await api.get('/api/users')

    expect(response.body.length).toBe(0)
})


afterAll(() => {
    mongoose.connection.close()
})
