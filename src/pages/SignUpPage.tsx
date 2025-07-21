import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/sermons"); //  redirect to archived sermons on successful signup
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/sermons");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign up with Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-white">Hi There 👋</h2>
          <p className="mt-2 text-sm text-gray-400">
            Create an account to access archived sermons
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleEmailSignup} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Input */}
            <div className="relative">
              <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FcGoogle className="text-2xl" />
          <span>Sign up with Google</span>
        </button>

        <p>Already have an account? <Link to="/login" className="text-blue-500 underline">Log in</Link>.</p>
      </div>
    </div>
  );
};

export default SignupPage;
