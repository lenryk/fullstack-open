import { createSlice } from '@reduxjs/toolkit'

const initialState = {message: null, timeoutId: null}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notification(state, action) {
      return {...state, message: action.payload}
    },
    storeTimeoutId(state, action) {
      return {...state, timeoutId: action.payload}
    },
    getTimeout(state) {
      console.log(state.timeoutId)
     return state
    }
  },
})

export const setNotification = (message, timeout) => {
  return dispatch => {
    // get timeout from state (if null do nothing)
    const cancelId = dispatch(getTimeout())
    // clear the timeout with the id
    clearTimeout(cancelId)
    // update message
    dispatch(notification(message))
    // create new settimeout event and keep id
    const timeoutId = setTimeout(() => {
      dispatch(notification(null))
    }, timeout * 1000)
    // save id to state
    dispatch(storeTimeoutId(timeoutId))
  }
}

export const {notification, storeTimeoutId, getTimeout} = notificationsSlice.actions
export default notificationsSlice.reducer
