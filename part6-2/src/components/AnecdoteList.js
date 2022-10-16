import { useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer';

export default function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter) {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }
    return anecdotes
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
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
             <button onClick={() => vote(anecdote)}>vote</button>
           </div>
         </div>
       )}
     </>
   )
}
