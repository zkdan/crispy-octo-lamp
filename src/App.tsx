import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{

    fetch('https://quiet-douhua-b0fd6b.netlify.app/.netlify/functions/openai-function').then(res=> res.json()).then(res =>console.log(res))
    
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'what are the numbers between 6 and 10?' },
      ],
      max_tokens:30
    };
     axios({
      method: 'POST',
      url:'https://api.openai.com/v1/chat/completions',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
    })
    // .then(response => response.json())
    .then(data => {
      console.log( {
        statusCode: 200,
        response: data
      })
    })
    .catch(error => {
      console.log( {
        statusCode:200,
        response: JSON.stringify(console.error(error))
      })
    });
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
