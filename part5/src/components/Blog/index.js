import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Blog({ blog }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div data-testid="blog" style={blogStyle}>
      <span data-testid="titleAuthor">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - by {blog.author}{' '}
        </Link>
      </span>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
