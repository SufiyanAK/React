import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleIncreament = () => {
    setCount(c => c < 20 ? c + 1 : c)
  }

  const handleDecreament = () => {
    setCount(c => c > 0 ? c - 1 : c)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <>
      <h1>Sufiyan with React</h1>
      <h3>counter {count}</h3>
      <button onClick={handleIncreament}>Increament</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDecreament}>Decreament</button>
    </>
  )
}

export default App
