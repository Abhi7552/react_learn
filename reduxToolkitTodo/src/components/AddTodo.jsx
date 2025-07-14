import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from "../features/Todo/todoSlice.js"

function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const add = (e) => {
        e.preventDefault();
        if (input.trim()) {
            dispatch(addTodo(input));
            setInput('');
        }
    };

    return (
        <form className="flex mb-6" onSubmit={add}>
            <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                required
                placeholder="Write a todo..."
                className="flex-1 rounded-l-lg px-4 py-3 bg-white/80 text-black placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
                type="submit"
                className="rounded-r-lg px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
            >
                Add
            </button>
        </form>
    )
}

export default AddTodo;