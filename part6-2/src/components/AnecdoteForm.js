import { useDispatch } from 'react-redux'
import {addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.title.value
    dispatch(addNewAnecdote(content))
    dispatch(setNotification(`added '${content}' anecdote`, 10))
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
