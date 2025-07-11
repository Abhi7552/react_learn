import React from 'react'
import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';


function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        // Logic for handling login submission
        e.preventDefault();
        setUser({ name, password });
    };

    return (
        <div className="flex items-center justify-center  bg-gray-100">
            <div className="w-full max-w-md p-6 space-y-4 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login Page</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md hover:from-blue-600 hover:to-green-600 transition-all duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;