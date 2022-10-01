const dummy = (blogs) => {
    return 1
}

function totalLikes(blogs) {
    return blogs.reduce((prev, accum) => prev + accum.likes, 0)
}

function favoriteBlog(blogs) {
    return result = blogs.sort((a, b) => a.likes - b.likes).at(-1)
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}
