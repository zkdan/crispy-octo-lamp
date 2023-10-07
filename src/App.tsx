import {useState } from 'react'
import './App.css'
import axios from 'axios';
import Loader from './Loader';
function App() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [personality, setPersonality] = useState<string>('');
  const handleClick = ()=>{
    setLoading(true)
    axios('https://quiet-douhua-b0fd6b.netlify.app/.netlify/functions/openai-function', {params:{question, personality}}).then(res =>{
      console.log(res);
      setResponse(res.data);
      setLoading(false);
  })
    
  }
  const handleChange : React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    setQuestion(e.target.value);
  }
  const handleSubmit: React.ChangeEventHandler<HTMLFormElement>=(e)=>{
    e.preventDefault();
    setQuestion('');
  }
  const handleChangePersona: React.ChangeEventHandler<HTMLFormElement>=(e)=>{
    setPersonality(e.target.value)
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <select name="" id="" onChange={handleChangePersona}>
        <option value="American linguist Dave Kush">Dave</option>
        <option value="Chinese haiku poet Lao tzu">laotsu</option>
        <option value="Rapper Ice T">T</option>
        <option value="French novelist Anaïs Nin">nin</option>
        <option value="French chef Remy the rat">remy</option>
      </select>
    <label htmlFor="question">Ask any question</label>
      <input id="question" type="text" onChange={handleChange} value={question}/>
      <button onClick={handleClick}>Hit it, baby</button>
    </form>
        <div>
          {loading ? <Loader /> : response}
        </div>
    </>
  )
}

export default App
