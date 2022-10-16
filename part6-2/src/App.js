import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from '../src/components/AnecdoteList';
import Notifications from '../src/components/Notification'
import Filter from '../src/components/Filter'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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
