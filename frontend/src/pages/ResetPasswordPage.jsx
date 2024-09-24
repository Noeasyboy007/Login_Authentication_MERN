import { useState } from "react"
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import InputForm from "../components/InputForm";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Please make sure the new password and confirmed password are the same.");
            return;
        }

        try {
            await resetPassword(token, password);
            toast.success("Password reset successfully, redirecting to login page...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);  // 2000 milliseconds (2 seconds) delay
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Password reset failed, please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className="p-8">
                {/* For Heading */}
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-violet-300 to-violet-500 text-transparent bg-clip-text">Reset Password</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {message && <p className="text-purple-500 text-sm mb-4">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <InputForm
                        icon={Lock}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputForm
                        icon={Lock}
                        type='confirmPassword'
                        placeholder='Confiem Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {/* For login button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Set New Password"}
                    </motion.button>

                </form>
            </div>
        </motion.div>
    )
}

export default ResetPasswordPage
