import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constants";

const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("profileImage", fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post(
        BASE_URL + "/api/v1/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-400 font-sans">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-4 mt-4 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-5 tracking-wide font-mono">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  className="block text-base font-semibold text-gray-700 mb-1 font-serif"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 font-medium font-sans text-base"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-base font-semibold text-gray-700 mb-1 font-serif"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 font-medium font-sans text-base"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 mb-1 font-serif"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 font-medium font-sans text-base"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 mb-1 font-serif"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 font-medium font-sans text-base"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 mb-1 font-serif"
                htmlFor="profileImage"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                ref={fileInputRef}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 font-sans text-base"
              />
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 mb-1 font-serif"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 font-medium font-sans text-base resize-none"
                placeholder="Tell about yourself"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition shadow-md tracking-wide font-mono text-base sm:text-lg sm:py-2.5"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-700 font-serif text-base">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Login
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

export default Signup;
