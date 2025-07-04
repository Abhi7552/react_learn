import { useState } from 'react'


function App() {
  const [bgColor, setBgColor] = useState('black')

  return (
    <div className="w-full h-screen duration-200" style={{backgroundColor:bgColor}}>

      <h1 className='flex justify-center text-3xl p-20'>Click on One Button to Change Background </h1>
      <div className='flex fixed flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        
        <div className='flex flex-wrap justify-center gap-3 shadow-lg rounded-lg p-2 bg-white'>
          <button 
          onClick={()=>setBgColor("red")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"red"}}>Red</button>

          <button onClick={()=>setBgColor("blue")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"blue"}}>Blue</button>

          <button onClick={()=>setBgColor("green")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"green"}}>Green</button>

          <button onClick={()=>setBgColor("yellow")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"yellow"}}>Yellow</button>

          <button onClick={()=>setBgColor("lavender")}className='outline-none px-4 py-1 rounded-full text-light-green shadow-lg' style={{backgroundColor:"lavender"}}>Lavender</button>

          <button onClick={()=>setBgColor("olive")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"olive"}}>Olive</button>


          <button onClick={()=>setBgColor("pink")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"pink"}}>Pink</button>

          <button onClick={()=>setBgColor("purple")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"purple"}}>Purple</button>

          <button onClick={()=>setBgColor("grey")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"grey"}}>Grey</button>


          <button onClick={()=>setBgColor("black")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"black"}}>Black</button>
        </div>
      </div>
    </div>
  )
}

export default App
