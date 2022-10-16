import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from '../src/components/AnecdoteList';
import Notifications from '../src/components/Notification'
import Filter from '../src/components/Filter'
import {useEffect} from 'react'
import anecdoteService from './services/anecdotes'
import {useDispatch} from 'react-redux'
import { saveAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(saveAnecdotes(anecdotes)))
  }, [dispatch])



  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notifications />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
