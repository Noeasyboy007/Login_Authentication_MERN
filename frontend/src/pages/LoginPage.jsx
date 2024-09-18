import { useState } from 'react';
import { motion } from "framer-motion"
import { Mail, Loader } from "lucide-react"
import { Link } from 'react-router-dom';

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
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        {/* for heading */}
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-violet-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>

        {/* for form */}
        <form onSubmit={handleLogin}>
          
        </form>

      </div>
    </motion.div>
  )
}

export default LoginPage
