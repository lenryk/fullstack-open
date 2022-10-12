export default function LoginForm({ username, password, setUsername, setPassword, handleSubmit }) {

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleSubmit}>
        <span >username:</span><input data-testid="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        <br/>
        <span>password:</span><input data-testid="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <br/>
        <button data-testid="login" type="submit">login</button>
      </form>
    </>
  )
}
