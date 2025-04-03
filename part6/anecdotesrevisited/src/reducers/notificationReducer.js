import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload.text
    },
    clearNotification(state) {
      return ''
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ text }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000) 
  }
};

export default notificationSlice.reducer
