import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

import FlotingShape from "./components/FlotingShape"

import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx"
import DashBoardPage from "./pages/DashBoardPage.jsx"

import { useAuthStore } from "./store/authStore.js"
import LoadingSpinner from "./components/LoadingSpinner .jsx"

// Protected Route that for authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children;
}

// for Re-direct authenticated users to home page whrn user signup and user not change there url dynamic until logout
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const { checkAuth, isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  console.log("User Login Successfully");
  console.log("isAuthenticated", isAuthenticated);
  console.log("Uer data :-", user);
  // console.log("user login", user);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-700 to-purple-950 flex items-center justify-center relative overflow-hidden">
      {/* For Background Floting Items */}
      <FlotingShape color="bg-purple-300" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-purple-300" size="w-48 h-48" top="40%" left="60%" delay={5} />
      <FlotingShape color="bg-purple-300" size="w-32 h-32" top="50%" left="5%" delay={2} />

      <Routes>
        {/* Here all routes */}
        <Route path="/" element={<ProtectedRoute><DashBoardPage /></ProtectedRoute>} />
        <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
        <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
        <Route path="/verify-email" element={<RedirectAuthenticatedUser><EmailVerificationPage /></RedirectAuthenticatedUser>} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
