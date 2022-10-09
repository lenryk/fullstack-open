export default function LoginForm({title, author, url, setTitle, setAuthor, setUrl, handleSubmit}) {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <span>title:</span><input value={title} onChange={(event) => setTitle(event.target.value)}/>
                <br/>
                <span>author:</span><input value={author} onChange={(event) => setAuthor(event.target.value)}/>
                <br/>
                <span>url:</span><input value={url} onChange={(event) => setUrl(event.target.value)}/>
                <br/>
                <button type="submit">create</button>
            </form>
        </>
    )
}
