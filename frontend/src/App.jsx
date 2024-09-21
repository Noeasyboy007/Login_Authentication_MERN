import { Route, Routes } from "react-router-dom"

import FlotingShape from "./components/FlotingShape"

import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-700 to-purple-950 flex items-center justify-center relative overflow-hidden">
      {/* For Background Floting Items */}
      <FlotingShape color="bg-purple-300" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-purple-300" size="w-48 h-48" top="40%" left="60%" delay={5} />
      <FlotingShape color="bg-purple-300" size="w-32 h-32" top="50%" left="5%" delay={2} />

      <Routes>
        {/* Here all routes */}
        <Route path="/" element={"Home Page"} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
