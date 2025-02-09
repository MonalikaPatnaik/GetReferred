import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { firestore } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Navbar from "./Navbar";

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSubmit = async (email: string) => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const emailDocRef = doc(firestore, "emails", "emailsList");
      const emailDocSnap = await getDoc(emailDocRef);

      if (emailDocSnap.exists()) {
        const existingEmails = emailDocSnap.data().emails || [];

        // Check for duplicate emails
        if (existingEmails.includes(email)) {
          setMessage("This email is already subscribed!");
          return;
        }

        await updateDoc(emailDocRef, {
          emails: arrayUnion(email),
        });
      } else {
        await setDoc(emailDocRef, { emails: [email] });
      }

      setMessage("You've been successfully subscribed!");
      setEmail("");
    } catch (e) {
      console.error("Error adding email: ", e);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const calculateTimeLeft = () => {
    const launchDate = new Date("2025-02-24T23:59:59");
    const now = new Date().getTime();
    const difference = launchDate.getTime() - now;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-cyan-600 via-black to-cyan-900 text-white font-sans px-6 text-center">
      <motion.h1
        className="text-6xl font-bold tracking-wide text-cyan-300"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Referrly
      </motion.h1>

      <p className="text-lg text-gray-300 max-w-lg mt-4">
        The future of referrals is almost here. Earn rewards, connect faster, and grow with Referrly!
      </p>

      <div className="flex space-x-8 mt-10">
        {Object.entries(timeLeft).map(([key, value]) => (
          <motion.div
            key={key}
            className="text-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="text-5xl font-bold text-cyan-400">{value}</div>
            <div className="text-sm uppercase text-gray-400">{key}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 w-full max-w-lg">
        <p className="text-md text-gray-300 mb-2">Be the first to know when we launch:</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-500 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full sm:w-auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <motion.button
            onClick={() => handleEmailSubmit(email)}
            whileHover={{
              scale: 1.05,
              backgroundColor: ["#00FFFF", "#FFFFFF", "#00FFFF"],
              transition: { duration: 0.5, repeat: Infinity },
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2 font-semibold rounded-lg overflow-hidden bg-transparent border-2 border-cyan-400 text-cyan-400 transition-all hover:text-black sm:w-auto w-full"
          >
            <span className="absolute inset-0 bg-cyan-400 opacity-0 hover:opacity-100 transition-all duration-500"></span>
            <span className="relative z-10">Get Notified</span>
          </motion.button>
        </div>

        {/* Message Alert */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-4 text-sm ${
              message.includes("successfully") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
