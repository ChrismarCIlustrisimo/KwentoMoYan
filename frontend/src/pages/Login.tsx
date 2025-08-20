import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = () => {
  const [userData, setUserData] = useLocalStorage('userData', { username: '', password: '' });
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_HOST = import.meta.env.VITE_API_HOST;
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    });
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Store current form values in localStorage
      setUserData(formValues);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_HOST}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      
      alert('Login successful!');
      navigate('/feed');
    }catch (err) {
      setError('Login failed. Please check your credentials.');
      return;
    }

  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white border p-6 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          KwentoMoYan
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
            </div>


          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4"
              onChange={handleRememberMe}
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
