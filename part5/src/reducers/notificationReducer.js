import { createSlice } from '@reduxjs/toolkit'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

export const { createNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
