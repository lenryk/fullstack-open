import { useSelector, useDispatch} from 'react-redux'
import {incrementVote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer';

export default function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id) => {
    dispatch(incrementVote(id))
    dispatch(setNotification(`added a vote!`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
     <>
       {anecdotes.map(a => a).sort((a,b) => b.votes - a.votes).map(anecdote =>
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
     </>
   )
}
