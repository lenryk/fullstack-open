import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import { getAll, createBlog, updateBlog, deleteBlog } from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [viewBlogForm, setViewBlogForm] = useState(false)

  async function getBlogs() {
    const blogData = await getAll()
    const sortedByLikes = blogData.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedByLikes)
  }

  useEffect(() => {
    if(user) {
      getBlogs()
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const user = await loginService({ username,password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      setErrorMessage('Invalid login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  async function handleCreateBlog(newBlogObj) {
    try {
      await createBlog(newBlogObj)
      await getBlogs()
      setErrorMessage('Added blog successfully!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(err) {
      console.log(err)
      setErrorMessage('Error adding new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  async function handleLike(blogObj) {
    try {
      await updateBlog({ ...blogObj, likes: blogObj.likes + 1, user: blogObj.user.id })
      await getBlogs()
      setErrorMessage(`Added like to ${blogObj.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(err) {
      console.log(err)
      setErrorMessage('Error adding likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  async function handleDelete(blogObj) {
    if (window.confirm(`Do you really want to delete ${blogObj.title} by ${blogObj.author}`)) {
      try {
        await deleteBlog(blogObj.id)
        await getBlogs()
        setErrorMessage(`Deleted blog ${blogObj.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch(err) {
        console.log(err)
        setErrorMessage('Error deleting blog :(')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  }

  function handleLogout() {
    setUser(null)
    localStorage.clear()
  }

  if (!user) {
    return (
      <div>
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleSubmit={handleSubmit}/>
        {errorMessage && <h2 style={{ color:'red' }}>{errorMessage}</h2>}

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>Logged in as {user.name}   </span><button onClick={handleLogout}>Logout</button>
      <br/>
      <button data-testid="createNote" onClick={() => setViewBlogForm(!viewBlogForm)}>create note</button>
      {errorMessage && <h2 style={{ color:'green' }}>{errorMessage}</h2>}
      {viewBlogForm && <AddBlogForm handleSubmit={handleCreateBlog} />}
      {viewBlogForm && <button onClick={() => setViewBlogForm(!viewBlogForm)}>cancel</button>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default App
