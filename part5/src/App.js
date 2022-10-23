import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import { getAll, createBlog, updateBlog, deleteBlog } from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Users from './components/Users'
import IndividualBlog from './components/IndividualBlog'
import Nav from './components/Nav'

const App = () => {
  const [user, setUser] = useState(() =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [viewBlogForm, setViewBlogForm] = useState(false)

  const dispatch = useDispatch()
  const notification = useSelector(({ notifications }) => notifications)

  async function getBlogs() {
    const blogData = await getAll()
    const sortedByLikes = blogData.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedByLikes)
  }

  useEffect(() => {
    if (user) {
      getBlogs()
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const user = await loginService({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      dispatch(createNotification('Invalid login'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  async function handleCreateBlog(newBlogObj) {
    try {
      await createBlog(newBlogObj)
      await getBlogs()
      dispatch(createNotification('Added blog successfully'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (err) {
      console.log(err)
      dispatch(createNotification('Error adding new blog'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  async function handleLike(blogObj) {
    try {
      await updateBlog({
        ...blogObj,
        likes: blogObj.likes + 1,
        user: blogObj.user.id,
      })
      await getBlogs()
      dispatch(createNotification(`Added like to ${blogObj.title}`))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (err) {
      console.log(err)
      dispatch(createNotification('Error adding likes'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  async function handleDelete(blogObj) {
    if (
      window.confirm(
        `Do you really want to delete ${blogObj.title} by ${blogObj.author}`
      )
    ) {
      try {
        await deleteBlog(blogObj.id)
        await getBlogs()
        dispatch(createNotification(`Deleted blog ${blogObj.title}`))
        setTimeout(() => {
          dispatch(createNotification(null))
        }, 5000)
      } catch (err) {
        console.log(err)
        dispatch(createNotification('Error deleting blog :('))
        setTimeout(() => {
          dispatch(createNotification(null))
        }, 5000)
      }
    }
  }

  function Blogs({ data: blogs }) {
    return (
      <>
        {viewBlogForm ? null : (
          <button
            data-testid="createNote"
            onClick={() => setViewBlogForm(!viewBlogForm)}
          >
            create note
          </button>
        )}
        <div data-testid="blogs">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </>
    )
  }

  function handleLogout() {
    setUser(null)
    localStorage.clear()
  }

  if (!user) {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
        {notification && <h2 style={{ color: 'red' }}>{notification}</h2>}
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Nav user={user.name} handleLogout={handleLogout} />
        <h2>blogs</h2>
        <span>Logged in as {user.name} </span>
        <br />
        {notification && <h2 style={{ color: 'green' }}>{notification}</h2>}
        {viewBlogForm && <AddBlogForm handleSubmit={handleCreateBlog} />}
        {viewBlogForm && (
          <button onClick={() => setViewBlogForm(!viewBlogForm)}>cancel</button>
        )}
        <Routes>
          <Route path="/" element={<Blogs data={blogs} />} />
          <Route path="/users" element={<Users data={blogs} />} />
          <Route path="/users/:author" element={<Users data={blogs} />} />
          <Route
            path="/blogs/:id"
            element={<IndividualBlog data={blogs} handleLike={handleLike} />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
