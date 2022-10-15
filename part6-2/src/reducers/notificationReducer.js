import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  },
})

export const {setNotification} = notificationsSlice.actions
export default notificationsSlice.reducer
