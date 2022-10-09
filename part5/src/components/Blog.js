import {useState} from 'react'

function Blog({blog}) {
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
                <li>{blog.likes}</li>
              </ul>
          )}
      </div>
      )

}

export default Blog
