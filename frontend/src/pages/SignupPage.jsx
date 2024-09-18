import { useState } from "react";
import { motion } from "framer-motion"
import { User, Mail, Lock } from "lucide-react"

import InputForm from "../components/InputForm";

const SignupPage = () => {

    // For form onSubmit Function
    const handelSignup = (e) => {
        e.preventDefult();
    }

    // For state And Value
    const [name, setName] = useState();
    const [mail, setMail] = useState();
    const [password, setpassword] = useState();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

            <div className="p-8">
                {/* For Heading */}
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-violet-300 to-violet-500 text-transparent bg-clip-text">Create Account</h2>

                {/* For Text input Form */}
                <form onSubmit={handelSignup}>

                    {/* For Name */}
                    <InputForm
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* For Email */}
                    <InputForm
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />

                    {/* For Password */}
                    <InputForm
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />

                    {/* for password meter */}
                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-purple-600
						hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'

                    ></motion.button>

                </form>
            </div>
        </motion.div>
    )
}

export default SignupPage
