import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import {getAll, createBlog, updateBlog} from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)



    const [viewBlogForm, setViewBlogForm] = useState(false)

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

    async function handleCreateBlog(newBlogObj) {
        try {
            await createBlog(newBlogObj)
            const blogData = await getAll()
            setBlogs(blogData)
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
            await updateBlog({...blogObj, likes: blogObj.likes + 1, user: blogObj.user.id})
            const blogData = await getAll()
            setBlogs(blogData)
            setErrorMessage(`Added like to ${blogObj.blog.title}`)
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
        <br/>
        <button onClick={() => setViewBlogForm(!viewBlogForm)}>create note</button>
        {errorMessage && <h2 style={{color:'green'}}>{errorMessage}</h2>}
        {viewBlogForm && <AddBlogForm handleSubmit={handleCreateBlog} />}
        {viewBlogForm && <button onClick={() => setViewBlogForm(!viewBlogForm)}>cancel</button>}
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
        )}
    </div>
  )
}

export default App
