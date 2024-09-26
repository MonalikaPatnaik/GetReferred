"use client"; // Required to make the component a Client Component

import { useState } from "react";

type Role = "referee" | "referrer";

const Signup: React.FC = () => {
  const [role, setRole] = useState<Role>("referee");

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center">
          Sign Up
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

        {/* Form Fields Based on Role */}
        {role === "referee" ? (
          <form>
            <div className="mb-4">
              <label className="block text-teal-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Phone No.</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Phone Number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Resume</label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Work Experience</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Work Experience"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Education</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Education"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Set a Username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Set a Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Sign Up as Referee
            </button>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block text-teal-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Company</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Company"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Work Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Work Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Job Profile</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Job Profile"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Set a Username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Set a Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Sign Up as Referrer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
