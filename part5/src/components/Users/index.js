import { useParams, Link } from 'react-router-dom'

export default function Users({ data: users }) {
  const { author } = useParams()
  const totals = []
  users.forEach((blog) => {
    totals.push(blog.author)
  })

  console.log(users)

  const totalObject = totals.reduce((prev, curr, index) => {
    return Object.assign(prev, {
      [curr]: totals.filter((blog) => blog === totals[index]).length,
    })
  }, {})

  if (author) {
    let filteredBlogs
    try {
      filteredBlogs = users.filter((blog) => blog.author === author)
    } catch {
      filteredBlogs = []
    }

    return (
      <>
        <h2>Blogs for author {author}</h2>
        <ul>
          {filteredBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <ul>
      {Object.keys(totalObject).map((key) => {
        return (
          <li key={key}>
            <Link to={`/users/${key}`}>
              {key} - {totalObject[key]}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
