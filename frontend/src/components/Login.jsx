// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeId } from '../store/loginSlice'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/login', // Adjust the URL according to your backend
                data: {
                    email: email,
                    password: password
                }
            });

            console.log('Login Response:', response.data);
            // Assuming response.data contains the userId
            // dispatch(changeId(response.data.userId)); // Store userId in Redux store
            sessionStorage.setItem('userId', JSON.stringify(response.data.userId));
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
            // Handle login error (e.g., show error message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-customBg">
            <form className="bg-formBg p-8 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
