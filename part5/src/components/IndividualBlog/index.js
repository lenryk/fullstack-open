import { useParams } from 'react-router-dom'

export default function IndividualBlog({ data, handleLike }) {
  const { id } = useParams()
  const singleBlog = data.filter((blog) => blog.id === String(id))

  console.log(singleBlog)

  return (
    <>
      <h2>
        {singleBlog[0].title} - {singleBlog[0].author}
      </h2>
      <p>
        <a href={singleBlog[0].url}>{singleBlog[0].url}</a>
      </p>
      <span>
        {singleBlog[0].likes} likes{' '}
        <button onClick={() => handleLike(singleBlog[0])}>like</button>
      </span>
      <p>Added by {singleBlog[0].user.username}</p>
    </>
  )
}
