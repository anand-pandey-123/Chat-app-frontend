import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


useEffect(() => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("token_expiry");
  if (token && expiry && Date.now() > Number(expiry)) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");
    // Optionally redirect to login
    navigate("/");
  }

}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await axios.post(BASE_URL + "/api/v1/user/login", {
        email,
        password,
      });

      const expires = Date.now() + 3600 * 1000; // 1 hour from now
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token_expiry", expires);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-400 font-sans">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-7 tracking-wide font-mono">
            Chat App Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-700 mb-1 font-serif"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1"></path>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder-gray-400 bg-gray-50 hover:border-indigo-400 text-gray-800 font-medium font-sans text-base"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-semibold text-gray-700 mb-1 font-serif"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder-gray-400 bg-gray-50 hover:border-indigo-400 text-gray-800 font-medium font-sans text-base"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition shadow-md tracking-wide font-mono text-lg"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-700 font-serif text-base">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
      <footer className="text-center py-4 text-white text-base opacity-90 font-serif tracking-wide">
        &copy; {new Date().getFullYear()} Chat App. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;