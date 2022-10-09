import {useState} from 'react'

function Blog({blog}) {
  const [visibility, setVisibility] = useState(false)

  return (
      <div>
        {blog.title} <button onClick={() => setVisibility(!visibility)}>{visibility ? 'close' : 'view'}</button>
        <div>
          {visibility && <span>{blog.author} {blog.url}</span>}
        </div>
      </div>
      )

}

export default Blog
