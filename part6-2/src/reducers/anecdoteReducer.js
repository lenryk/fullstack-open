const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INCREMENT_VOTE':
      // get ID sent from the action function below
      const id = action.data.id
      // search array of objects to find object that matches passed in id param from function below
      const itemChange = state.find(item => item.id === id)
      // create a new object with the old state and overwrite the votes with a +1
      const changedItem = {
        ...itemChange,
        votes: itemChange.votes + 1
      }
      // return a new array with all the old objects. if the id of the object matches the one passed in
      // then return the new changedItem instead of the existing one
      return state.map(item => item.id !== id ? item : changedItem)
    case 'ADD_NEW':
      const newItem = {
        content: action.data,
        id: getId(),
        votes: 0
      }
      return [...state, newItem]
    default:
      return state
  }
}

export function incrementVote(id) {
  return {
    type: 'INCREMENT_VOTE',
    data: {id}
  }
}

export function addNewAnecdote(data) {
  return {
    type: 'ADD_NEW',
    data,
  }
}

export default reducer
