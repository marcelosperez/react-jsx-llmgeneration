import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Quick React</h1>
      <article className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </article>
    </>
  )
}

export default App
