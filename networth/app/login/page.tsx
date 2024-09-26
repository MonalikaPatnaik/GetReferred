"use client"; // Add this to make it a Client Component

import { useState } from "react";

type Role = "referee" | "referrer";

const Login: React.FC = () => {
  const [role, setRole] = useState<Role>("referee");

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center">
          Login
        </h1>

        {/* Slider/Toggle for Role Selection */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg focus:outline-none ${
              role === "referee"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("referee")}
          >
            Referee
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg focus:outline-none ${
              role === "referrer"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("referrer")}
          >
            Referrer
          </button>
        </div>

        {/* Form Fields for Username and Password Based on Role */}
        <form>
          <div className="mb-4">
            <label className="block text-teal-700">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Your Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-teal-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            {role === "referee" ? "Login as Referee" : "Login as Referrer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
