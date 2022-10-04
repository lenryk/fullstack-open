const initialBlogs = [
    {
        title: "blog post one",
        author: "jeff",
        url: "https://google.com",
        likes: 50
    },
    {
        title: "blog post two",
        author: "mike",
        url: "https://google.com",
        likes: 20
    }
]

const newBlog = {
    title: "my new blog post",
    author: "martin",
    url: "https://google.co.uk",
    likes: 21
}

const invalidNewBlog = {
    author: "sam",
    url: "https://google.co",
    likes: 69
}

const updatedBlogPost = {
    title: "this has been updated",
    author: "gary",
    url: "https://google.ca",
    likes: 29
}

const invalidUser = {
    name: 'Jeff',
    username: 'Mi',
    password: 'hackme'
}

module.exports = {
    initialBlogs, newBlog, invalidNewBlog, updatedBlogPost, invalidUser
}
