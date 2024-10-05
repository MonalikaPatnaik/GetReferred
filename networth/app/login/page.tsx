"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type Role = "referee" | "referrer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      window.location.assign("/");
    } catch (error: any) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-teal-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-teal-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Don't have an account */}
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-teal-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
