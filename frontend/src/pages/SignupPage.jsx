import { motion } from "framer-motion"

const SignupPage = () => {

    // For form onSubmit Function
    const handelSignup = (e) => {
        e.preventDefult();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

            <div className="p-8">
                {/* For Heading */}
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-violet-200 to-violet-500 text-transparent bg-clip-text">Create Account</h2>

                {/* For Text input Form */}
                <form onSubmit={handelSignup}>

                </form>
            </div>
        </motion.div>
    )
}

export default SignupPage
