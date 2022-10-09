import {useState} from 'react'

function Blog({blog}) {
  const [visibility, setVisibility] = useState(false)

  return (
      <div>
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
