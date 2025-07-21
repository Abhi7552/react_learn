import React, { useState } from 'react'
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Logo, Input } from './index'
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';


function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signUp = async (data) => {
        setError("");
        setLoading(true);
        try {
            // Ensure correct keys are passed
            const { name, email, password } = data;
            const session = await authService.createAccount({ name, email, password });
            console.log('Session after signup:', session);
            if (session) {
                const user = await authService.getCurrentUser();
                console.log('User after signup:', user);
                if (user) {
                    dispatch(login(user));
                    navigate("/");
                } else {
                    setError("Signup succeeded but could not fetch user. Try logging in.");
                }
            } else {
                setError("Signup failed: No session returned.");
            }
        } catch (err) {
            setError(err.message || JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <span className='inline-block w-full max-w-[100px] mb-5'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Create a new account</h2>
                <p className='text-center text-red-500 mb-4'>
                    Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Sign In</Link>
                </p>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                {loading && <p className='text-blue-500 mb-4'>Signing up...</p>}

                <form onSubmit={handleSubmit(signUp)} className='w-full max-w-lg bg-white rounded-xl p-10 border border-black/10'>
                    <Input
                        label="Name: "
                        type="text"
                        placeholder="Enter your Full name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email: "
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: true })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" disabled={loading}>Sign Up</Button>
                </form>
            </div>

        </div>
    )
}

export default SignUp;