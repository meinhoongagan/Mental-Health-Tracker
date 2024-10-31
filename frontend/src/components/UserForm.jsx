// FormComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = () =>{
        const response=axios({
            method: 'post',
            url: 'http://localhost:8000/users',
            data: {
                username: username,
                email: email,
                password:password
            }
          });
          console.log('Response:', response.data);
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-customBg">
      <form className="bg-formBg p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300" onClick={handleSubmit()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
