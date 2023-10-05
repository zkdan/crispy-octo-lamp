import { useState, useEffect } from 'react'
import './App.css'
// import axios from 'axios';
function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{

    fetch('https://quiet-douhua-b0fd6b.netlify.app/.netlify/functions/openai-function').then(res=> res.json()).then(res =>console.log(res))
    
  },[])

  return (
    <>
    <h1>Wow this is fun</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
