import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      // search array of objects to find object that matches passed in id param from function below
      const itemToChange = state.find(a => a.id === action.payload)
      // create a new object with the old state and overwrite the votes with a +1
      const changedItem = {
       ...itemToChange,
        votes: itemToChange.votes + 1
      }
      // return a new array with all the old objects. if the id of the object matches the one passed in
      // then return the new changedItem instead of the existing one
      return state.map(item => item.id !== action.payload ? item : changedItem)
    },
    saveAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(saveAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdotesService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    }
}

export const {incrementVote, saveAnecdotes, appendAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer
