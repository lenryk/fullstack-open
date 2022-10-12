import { useState } from 'react'
import PropTypes from 'prop-types'

function Blog({ blog, handleLike, handleDelete }) {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div data-testid="blog" style={blogStyle}>
      <span data-testid="titleAuthor">{blog.title} - by {blog.author} </span><button data-testid="viewToggle" onClick={() => setVisibility(!visibility)}>{visibility ? 'close' : 'view'}</button>
      {visibility && ( <ul>
        <li>URL: <span>{blog.url}</span></li>
        <li>Likes:<span data-testid="likes">{blog.likes}</span><button data-testid="like" onClick={() => handleLike(blog)}>like</button></li>
        {blog.user.username === JSON.parse(localStorage.getItem('user')).username ? <button data-testid="deleteBlog" onClick={() => handleDelete(blog)}>delete blog</button> : null}
      </ul>
      )}
    </div>
  )

}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
