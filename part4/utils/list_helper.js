const dummy = (blogs) => {
    return 1
}

function totalLikes(blogs) {
    return blogs.reduce((prev, accum) => prev + accum.likes, 0)
}

module.exports = {
    dummy, totalLikes
}
