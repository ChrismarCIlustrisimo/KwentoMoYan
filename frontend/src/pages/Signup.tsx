import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [formValues, setFormValues] = useState({ name: "", username: "", password: "", });
  const [error, setError] = useState("");
  const API_HOST = import.meta.env.VITE_API_HOST;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try { 
    const res = await fetch(`${API_HOST}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message); // accept either
    }

    alert("Signup successful!");
    navigate("/login");
  } catch (err: any) {
    setError(`${err.message}`);
  }
};


  return (
<div className="flex justify-center items-center min-h-screen bg-gray-100">
  {/* Parent Container */}
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>

        {/* Name */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Username */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* Login link */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  </div>

  );
};

export default Signup;
