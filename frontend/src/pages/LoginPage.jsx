/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { motion } from "framer-motion"
import { Lock, Mail, Loader } from "lucide-react"
import { Link } from 'react-router-dom';

import InputForm from '../components/InputForm';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Submit Function
  const handleLogin = async (e) => {
    e.preventDefault();
    // Here icall backend API to check the credentials
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >

      <div className='p-8'>

        {/* for heading */}
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-violet-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>

        {/* for form */}
        <form onSubmit={handleLogin}>

          {/* For mail id */}
          <InputForm
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* For password */}
          <InputForm
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* For Forgot Password */}
          <div className='flex items-center mb-6'>
            <Link to='/forgot-password' className='text-sm text-purple-400 hover:underline'>
              Forgot password?
            </Link>
          </div>


          {/* For Submit button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            type='submit'
          >
            Login
          </motion.button>

        </form>
      </div>

      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{"  "}
          <Link to='/signup' className='text-purple-400 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>

    </motion.div>
  )
}

export default LoginPage
