import {addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import {connect} from 'react-redux'

function AnecdoteForm({addNewAnecdote, setNotification}) {

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.title.value
    addNewAnecdote(content)
    setNotification(`added '${content}' anecdote`, 10)
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

const mapDispatchToProps = {
  addNewAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
