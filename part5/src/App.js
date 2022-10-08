import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [user, setUser] = useState(null)
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
        <p>Logged in as {user.name}</p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
