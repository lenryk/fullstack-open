import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [state, setState] = useState({selected: 0, votes: { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}})
    const [mostVotes, setMostVotes] = useState({index:0, votes: 0})

    for (const [key, value] of Object.entries(state.votes)) {
        if (value > mostVotes.votes) {
            setMostVotes(() => ({index: key, votes: value}))
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[state.selected]}</p>
            <p>has {state.votes[state.selected]} votes</p>
            <button onClick={() => setState({...state, votes: { ...state.votes, [state.selected]: state.votes[state.selected] + 1}})}>vote</button>
            <button onClick={() => setState({...state, selected: Math.floor(Math.random() * 7)})}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVotes.index]}</p>
            <p>has {mostVotes.votes} votes</p>
        </div>
    )
}

export default App
