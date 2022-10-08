import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      async function getBlogs() {
          await blogService().then((res) => setBlogs(res))
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
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
