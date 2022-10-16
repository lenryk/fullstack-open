import { createSlice } from '@reduxjs/toolkit'

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
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    saveAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const {incrementVote, addNewAnecdote, saveAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer
