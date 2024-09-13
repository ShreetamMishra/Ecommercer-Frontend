//signup
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from './Navbar';
import signup from "../assets/Login.png"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const baseURL = 'https://ecommerce-backend-7jr9.onrender.com/';
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      swal({
        text: "Error! Passwords are not matching",
        icon: "error",
        closeOnClickOutside: false,
      });
      return;
    }

    const user = {
      email,
      firstName,
      lastName,
      password,
    };

    try {
      await axios.post(`${baseURL}user/signup`, user);
      swal({
        text: "User signup successful. Please Login",
        icon: "success",
        closeOnClickOutside: false,
      });
      navigate('/signin');
    } catch (err) {
      console.error(err);
      swal({
        text: "Error! Signup failed",
        icon: "error",
        closeOnClickOutside: false,
      });
    }
  };

  return (
    <div className='h-screen bg-gray-100 overflow-hidden dark:bg-gray-800'>
      <Navbar />
      <div className="flex justify-center items-center mt-10 ">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center ">
          {/* Left div for the image, only visible on large screens */}
          <div className="hidden lg:block">
            <img
              src={signup}
              alt="Signup Visual"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right div for the signup card */}
          <div className="w-full max-w-md mx-auto py-4 px-12 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="passwordConfirm"
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white p-2 rounded-md">Create Account</button>
            </form>
            <hr className="my-4" />
            <p className="text-center">
              Already have an account?{' '}
              <button className="text-primary hover:underline" onClick={() => navigate('/signin')}>
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
