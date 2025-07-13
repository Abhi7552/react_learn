import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });

  const addTodo = (todoText) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), todo: todoText, completed: false }
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTodoText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: updatedTodoText } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-8 text-white border border-white/20">
          <h1 className="text-4xl font-extrabold text-center mb-10 mt-2 text-white drop-shadow-lg tracking-tight">
            📝 Todo Manager
          </h1>
          <div className="mb-8">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-5 divide-y divide-white/10">
            {todos.length === 0 ? (
              <div className="text-center text-lg text-white/60 py-10">No todos yet. Add one!</div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  toggleComplete={toggleComplete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App;
