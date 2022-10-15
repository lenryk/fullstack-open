import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from '../src/components/AnecdoteList';
import Notifications from '../src/components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
