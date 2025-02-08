import { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  
  const total = (good + neutral + bad);
  const average = total > 0 ? ((good - bad) / total) : 0;
  const positive = total > 0 ? (good / total * 100) : 0;
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
      
      <h2>statistics</h2>
      <Statistics 
      good= {good}
      neutral= {neutral}
      bad= {bad}
      all= {total}
      average= {average}
      positive= {positive}
      />
    </div>
  )
}

export default App