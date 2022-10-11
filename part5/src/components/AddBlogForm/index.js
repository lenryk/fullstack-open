import { useState } from 'react'

export default function LoginForm({ handleSubmit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  function addBlog(event) {
    event.preventDefault()
    handleSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <span>title:</span><input data-testid="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
        <br/>
        <span>author:</span><input data-testid="author" value={author} onChange={(event) => setAuthor(event.target.value)}/>
        <br/>
        <span>url:</span><input data-testid="url" value={url} onChange={(event) => setUrl(event.target.value)}/>
        <br/>
        <button type="submit">create</button>
      </form>
    </>
  )
}

