import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-green-500 '>Tailwind Testing with props Practice</h1>
      <br />
      <Card username="Abhishek" designation="SDE-1"/>
      <Card username="Aman" designation="SDE-Intern"/>
      <Card username="Abhay" designation="SDE-Trainee"/>
    </>
  )
}

export default App
