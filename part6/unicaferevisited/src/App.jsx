import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button> 
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button> 
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>

      <h1>statistics</h1>
      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  )
}

export default App
