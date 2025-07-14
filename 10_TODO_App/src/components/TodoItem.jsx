import React from 'react'
import { useTodo } from '../context';
import { useState } from 'react';

function TodoItem({todo}) {

    const { deleteTodo, updateTodo, toggleComplete } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);

    const editTodo = () => {
        if (todoMsg.trim() === "") {
            alert("Todo cannot be empty");
            return;
        }
        updateTodo(todo.id, todoMsg);
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
        setTodoMsg(todo.todo);
        setIsTodoEditable(false);
    };

    return (
        <div
            className={`flex items-center justify-between border border-white/10 rounded-lg px-4 py-3 shadow bg-white/90 text-black transition-all duration-200 ${
                todo.completed ? "bg-green-200 line-through" : "bg-purple-100"
            }`}
        >
            {/* Done/Undo button on the left */}
            <div className="mr-4 flex-shrink-0">
                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold shadow transition-all duration-150 ${
                        todo.completed
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    onClick={toggleCompleted}
                    title={todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                >
                    {todo.completed ? (
                        <>
                            <span>↩️</span>
                            
                        </>
                    ) : (
                        <>
                            <span>✅</span>
                            
                        </>
                    )}
                </button>
            </div>
            {/* Todo text or input */}
            <div className="flex-1">
                {isTodoEditable ? (
                    <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") editTodo();
                            if (e.key === "Escape") setIsTodoEditable(false);
                        }}
                        autoFocus
                    />
                ) : (
                    <span className="font-medium">{todo.todo}</span>
                )}
            </div>
            {/* Edit and Delete buttons on the right */}
            <div className="flex gap-2 ml-4">
                {isTodoEditable ? (
                    <button
                        className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold shadow bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-150"
                        onClick={editTodo}
                        title="Save"
                    >
                        <span>💾</span> Save
                    </button>
                ) : (
                    <button
                        className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold shadow bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-150"
                        onClick={() => setIsTodoEditable(true)}
                        title="Edit"
                    >
                        <span>✏️</span> Edit
                    </button>
                )}
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold shadow bg-red-500 hover:bg-red-600 text-white transition-all duration-150"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete"
                >
                    <span>🗑️</span> Delete
                </button>
            </div>
        </div>
    )
}

export default TodoItem;