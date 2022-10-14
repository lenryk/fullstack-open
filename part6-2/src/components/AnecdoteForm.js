import { useDispatch } from 'react-redux'
import {addNewAnecdote} from '../reducers/anecdoteReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    dispatch(addNewAnecdote(title))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="title"/></div>
        <button type="submit">create</button>
      </form>
    </>
    )
}
