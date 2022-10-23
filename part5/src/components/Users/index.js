export default function Users({ data: users }) {
  const totals = []
  users.forEach((blog) => {
    totals.push(blog.author)
  })

  const totalObject = totals.reduce((prev, curr, index) => {
    return Object.assign(prev, {
      [curr]: totals.filter((blog) => blog === totals[index]).length,
    })
  }, {})

  return (
    <ul>
      {Object.keys(totalObject).map((key) => {
        return (
          <li key={key}>
            {key} - {totalObject[key]}
          </li>
        )
      })}
    </ul>
  )
}
