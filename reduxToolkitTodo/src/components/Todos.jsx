import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../features/Todo/todoSlice';

function Todos() {
    const todos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl shadow bg-white/90 transition ${
                        todo.completed ? "bg-green-100" : "bg-purple-100"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => dispatch(toggleTodo(todo.id))}
                            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                                todo.completed
                                    ? "border-green-500 bg-green-500 text-white"
                                    : "border-purple-400 bg-white text-purple-600"
                            } transition`}
                            title={todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                        >
                            {todo.completed ? "✔️" : ""}
                        </button>
                        <span className={`text-lg font-medium transition-all ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                            {todo.text}
                        </span>
                    </div>
                    <button
                        onClick={() => dispatch(removeTodo(todo.id))}
                        className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                        title="Remove"
                    >
                        🗑️
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Todos;