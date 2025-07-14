import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-200 via-blue-100 to-indigo-200">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
        <div className='text-center text-3xl font-bold text-gray-800 mb-8 drop-shadow-lg tracking-tight'>
          Todo App with Redux-Toolkit
        </div>
        <AddTodo />
        <Todos />
      </div>
    </div>
  )
}

export default App
