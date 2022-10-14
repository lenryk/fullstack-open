import { useSelector, useDispatch } from 'react-redux'
import {incrementVote, addNewAnecdote} from '../src/reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  const addNew = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    dispatch(addNewAnecdote(title))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="title"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
