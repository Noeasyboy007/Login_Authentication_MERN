import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading, verifyEmail } = useAuthStore();


    const handleChange = (index, value) => {
        const newCode = [...code]

        // HAndel pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non empty input or the frist empty one check
            const lastFillIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFillIndex < 5 ? lastFillIndex + 1 : 5;
            inputRefs.current[focusIndex].focus()
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the  next input field if value is enterd
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    // For BackSpace Key
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // For form Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            console.log('Email verify successfully');
            navigate('/login')
            toast.success('Email verify successfully', {
                style: {
                    background: 'purple',   
                    color: '#fff',         
                },
            })
        } catch (error) {
            console.log('Invaild or Expired Verification Code' + error);
            toast.error('Invaild or Expired Verification Code')
        }
    };

    // Auto SUbmit When all fields are filled
    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit(new Event('submit'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    return (
        <div className='max-w-md w-fullbg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full'
            >
                {/* for heading */}
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-violet-500 text-transparent bg-clip-text'>
                    Verify Your Email
                </h2>

                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

                {/* for input form */}
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                ref={(el) => (inputRefs.current[index] = el)}
                                maxLength='6'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none' />
                        ))}
                    </div>

                    {/* for Error message */}
                    {error && <p className='text-red-600 text-xs'>{error}</p>}

                    {/* For Submit button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Verify Email"}

                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default EmailVerificationPage
