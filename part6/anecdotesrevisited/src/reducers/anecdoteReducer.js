import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setNotificationWithTimeout } from './notificationReducer'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (anecdote) {
        anecdote.votes++
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
});

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:5001/anecdotes')
    dispatch(setAnecdotes(response.data))
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = { content, votes: 0 }
    const response = await axios.post('http://localhost:5001/anecdotes', newAnecdote)
    dispatch(appendAnecdote(response.data))
    dispatch(setNotificationWithTimeout(`new anecdote '${content}'`, 5))
  }
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    if (anecdote) {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      await axios.put(`http://localhost:5001/anecdotes/${id}`, updatedAnecdote)
      dispatch({ type: 'anecdotes/voteAnecdote', payload: id })
      dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5))
    }
  }
};

export const { voteAnecdote: localVoteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
