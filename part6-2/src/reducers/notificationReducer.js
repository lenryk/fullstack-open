import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload
    }
  },
})

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(notification(message))
    setTimeout(() => {
      dispatch(notification(null))
    }, timeout * 1000)
  }
}

export const {notification} = notificationsSlice.actions
export default notificationsSlice.reducer
