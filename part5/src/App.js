import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import {getAll, createBlog} from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

  useEffect(() => {
      async function getBlogs() {
          const blogData = await getAll()
          setBlogs(blogData)
      }

      if(user) {
         getBlogs()
          localStorage.setItem('user', JSON.stringify(user))
      }
  }, [user])

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const user = await loginService({username,password})
            setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            setErrorMessage('Invalid login')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    async function handleCreateBlog(event) {
        event.preventDefault()

        try {
            await createBlog({title,author,url})
            const blogData = await getAll()
            setBlogs(blogData)
            setTitle('')
            setAuthor('')
            setUrl('')
            setErrorMessage('Added blog successfully!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch {
            setErrorMessage('Error adding new blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
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
                {errorMessage && <h2 style={{color:'red'}}>{errorMessage}</h2>}

            </div>
        )
    }

  return (
    <div>
        <h2>blogs</h2>
        <span>Logged in as {user.name}   </span><button onClick={handleLogout}>Logout</button>
        <h2>create new blog</h2>
        {errorMessage && <h2 style={{color:'green'}}>{errorMessage}</h2>}
        <AddBlogForm title={title} author={author} url={url} handleSubmit={handleCreateBlog} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}/>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
