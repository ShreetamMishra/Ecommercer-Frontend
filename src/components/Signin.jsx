//signin
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import signin from "../assets/signin.png"

const Signin = ({ setUserEmail, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = { email, password };

    try {
      const response = await axios.post('https://ecommerce-backend-7jr9.onrender.com/user/signin', user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email); // Store email in localStorage
      setUserEmail(email);
      setIsLoggedIn(true);
      alert("Login successfully");
      if (email === "admin@example.com") {
        Navigate("/");
      } else {
        Navigate("/");
      }
    } catch (err) {
      setError('Unable to log you in!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 h-screen overflow-hidden dark:bg-gray-800">
      <Navbar />
      <div className="flex flex-col md:flex-row h-full items-center justify-center">
        {/* Left Section - Sign-in Form */}
        <div className="md:w-1/2 flex items-center justify-end mb-[5rem]">
          <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSignin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-black py-2 px-4 rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              New to our site?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">Create an account</a>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block md:w-1/2 mb-[6rem]">
          <img 
            src={signin}
            alt="Shopping" 
            className="object-cover h-[500px] w-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
