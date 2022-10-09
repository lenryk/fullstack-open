import {useState} from 'react'

function Blog({blog, handleLike, handleDelete}) {
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
        {blog.title} <button onClick={() => setVisibility(!visibility)}>{visibility ? 'close' : 'view'}</button>
          {visibility && ( <ul>
                <li>{blog.author}</li>
                <li>{blog.url}</li>
                <li>{blog.likes}  <button onClick={() => handleLike(blog)}>like</button></li>
                <button onClick={() => handleDelete(blog)}>delete blog</button>
              </ul>
          )}
      </div>
      )

}

export default Blog
