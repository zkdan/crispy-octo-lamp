import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  useEffect(()=>{
    axios.get('https://quiet-douhua-b0fd6b.netlify.app/.netlify/functions/openai-function')
    .then(response => {
        // Handle the response from your backend
        console.log(response.data)
      })
      .catch(error => {
        // Handle errors
        console.log(error)
      });

  },[])

  return (
    <>
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
