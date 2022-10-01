const dummy = (blogs) => {
    return 1
}

function totalLikes(blogs) {
    return blogs.reduce((prev, current) => prev + current.likes, 0)
}

function favoriteBlog(blogs) {
    return blogs.sort((a, b) => a.likes - b.likes).at(-1)
}

function mostBlogs(blogs) {
     const authors = blogs.reduce((prev, current) => {
         return ({ ...prev, [current.author]: (prev[current.author] + 1) || 1 })
        }, {})

    const sorted = Object.entries(authors).sort((a,b) => a[1] - b[1])
    return { author: sorted.at(-1)[0], blogs: sorted.at(-1)[1] }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}
