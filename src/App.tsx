import { useState } from 'react'
import './App.css'
import axios from 'axios';
function App() {
  // const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = ()=>{
    setLoading(true)
    axios('https://quiet-douhua-b0fd6b.netlify.app/.netlify/functions/openai-function', {params:{question: 'what time is it in Tokyo, Japan?'}}).then(res =>{
      console.log(res)
      // setResponse(res.data)
      setLoading(false)
  })
    
  }

  return (
    <>
    <fieldset>
      <legend>Choose your params</legend>
      <label htmlFor="playlist">Want a playlist?</label>
      <input type="checkbox" name="playlist" />
    </fieldset>
    <button onClick={handleClick}>Hit it, baby</button>
        <p>
          {loading ? <>loading...</> : <span>heh </span>}
        </p>
    </>
  )
}

export default App
