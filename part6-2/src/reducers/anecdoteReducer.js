import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      return state.map(item => item.id === action.payload.id ? action.payload : item)
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

export const addVote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdotesService.appendVote(content)
      dispatch(incrementVote(newAnecdote))
    }
}

export const {incrementVote, saveAnecdotes, appendAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer
