import { Link } from 'react-router-dom'

export default function Nav({ user, handleLogout }) {
  return (
    <div style={{ background: 'lightgray' }}>
      <span style={{ marginRight: 5 }}>
        <Link to="/">blog</Link>
      </span>
      <span style={{ marginRight: 5 }}>
        <Link to="/users">user</Link>
      </span>
      <span>
        Logged in as {user} <button onClick={handleLogout}>Logout</button>
      </span>
    </div>
  )
}
