import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // let counter= 5;
  let [counter, setCounter] = useState(5);

  const addValue=()=>{
    if(counter==20){
      return;
    }
    counter++;
    setCounter(counter);
    console.log("Counter Value:", counter);
  }

  const removeValue=()=>{
    if(counter<=0){
      return;
    }
    counter--;
    setCounter(counter);
    console.log("Counter Value:", counter);
  }

  return (
    <>
      <h1>Chai aur react with Hitesh sir</h1>
      <h2>Counter Value :{counter}</h2>
      <button onClick={addValue}>Increase Value</button>
      <br /> <br/>
      <button onClick={removeValue}>Decrease Value</button>
    </>
  )
}

export default App;
