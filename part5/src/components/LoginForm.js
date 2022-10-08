export default function LoginForm({username, password, setUsername, setPassword, handleSubmit}) {

    return (
        <>
            <h1>log in to application</h1>
            <form onSubmit={handleSubmit}>
                <span>username:</span><input value={username} onChange={(event) => setUsername(event.target.value)}/>
                <br/>
                <span>password:</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <br/>
                <button type="submit">login</button>
            </form>
        </>
    )
}
