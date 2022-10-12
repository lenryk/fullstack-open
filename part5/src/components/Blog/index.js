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
    <div style={blogStyle}>
      <span data-testid="titleAuthor">{blog.title} - by {blog.author} </span><button data-testid="viewToggle" onClick={() => setVisibility(!visibility)}>{visibility ? 'close' : 'view'}</button>
      {visibility && ( <ul>
        <li>{blog.url}</li>
        <li>{blog.likes}  <button data-testid="like" onClick={() => handleLike(blog)}>like</button></li>
        {blog.user.username === JSON.parse(localStorage.getItem('user')).username ? <button onClick={() => handleDelete(blog)}>delete blog</button> : null}
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
