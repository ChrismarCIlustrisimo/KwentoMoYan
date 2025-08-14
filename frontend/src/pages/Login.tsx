import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Login = () => {
  const [userData, setUserData] = useLocalStorage('userData', { username: '', password: '' });
  const [formValues, setFormValues] = useState({ username: '', password: '' });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', formValues);
    // Perform login logic...
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
            <input
              id="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
        </form>
      </div>
    </div>
  );
};

export default Login;
