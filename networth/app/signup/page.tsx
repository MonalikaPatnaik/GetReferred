"use client";

import { useState } from "react";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/router";

type Role = "referee" | "referrer";

const Signup = () => {
  const [role, setRole] = useState<Role>("referee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }


    if (phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!/^\+\d{1,3}\d{9,15}$/.test(countryCode + phoneNumber)) {
      setError("Invalid phone number format");
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phoneNumber: `(${countryCode})${phoneNumber}`,
        role,
      });

      console.log("User signed up successfully");
      window.location.assign("/");

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center">Sign Up</h1>

        {/* Role Selection */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg focus:outline-none ${role === "referee" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setRole("referee")}
          >
            Referee
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg focus:outline-none ${role === "referrer" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setRole("referrer")}
          >
            Referrer
          </button>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-teal-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4 flex">
            <div className="w-1/3 mr-2">
              <label className="block text-teal-700">Country Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
              />
            </div>
            <div className="w-2/3">
              <label className="block text-teal-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-teal-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Set a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-teal-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-600"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Sign Up as {role === "referee" ? "Referee" : "Referrer"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
