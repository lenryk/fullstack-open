import AnecdoteForm from '../src/components/AnecdoteForm'
import AncedoteList from '../src/components/AnecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AncedoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
