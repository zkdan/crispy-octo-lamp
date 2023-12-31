import {useState} from 'react';
import './App.css';
import axios from 'axios';
import Loader from './Loader';
function App() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const handleClick = ()=>{
    setLoading(true)
    axios('https://quiet-douhua-b0fd6b.netlify.app/.netlify/functions/openai-function', {params:{question}}).then(res =>{
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
  return (
    <>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Statue_of_Lao_Tzu_in_Quanzhou.jpg/1599px-Statue_of_Lao_Tzu_in_Quanzhou.jpg?20090820205352" alt="Statue of Lao Tzu in Quanzhou" />
    <form onSubmit={handleSubmit}>
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
