export default function AddComment({ onSubmit, setComment, comment }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setComment(e.target.value)} value={comment} />
        <button type="submit">add comment</button>{' '}
      </form>
    </>
  )
}
