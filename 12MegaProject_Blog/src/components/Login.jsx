import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../appwrite/auth';
import { Button, Logo, Input } from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { set, useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userdata = await authService.getCurrentUser();
                if (userdata) {
                    dispatch(authLogin(userdata));
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err.message);
        }
    }


    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <span className='inline-block w-full max-w-[100px] mb-5'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className='text-center text-red-500 mb-4'>
                Don't have an account? <Link to="/register" className='text-blue-500 hover:underline'>Sign Up</Link>
            </p>
            {error && <p className='text-red-500 mb-4'>{error}</p>}

            <form onSubmit={handleSubmit(login)} className='w-full max-w-lg bg-white rounded-xl p-10 border border-black/10'>
                <Input
                    label="Email: "
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true, validate: {
                            matchPattern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                        }
                    })}
                />
                <Input
                    label="Password: "
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <Button type="submit" className='w-full mt-4'>Login</Button>
            </form>
        </div>
    )
}

export default Login