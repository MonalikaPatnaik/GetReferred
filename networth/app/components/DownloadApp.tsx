import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { firestore } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const DownloadApp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handles email subscription
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const emailDocRef = doc(firestore, "emails", "emailsList");
      const emailDocSnap = await getDoc(emailDocRef);

      if (emailDocSnap.exists()) {
        const existingEmails = emailDocSnap.data().emails || [];

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
      setEmail(""); // Clear input after success
    } catch (e) {
      console.error("Error adding email: ", e);
      setMessage("Something went wrong. Please try again.");
    }
  };

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-[80vh] flex flex-col justify-between text-[#EAEAEA] font-sans px-6 pt-20 pb-10">
      {/* Main Download Section */}
      <div className="flex flex-col items-center text-center pb-10">
        <motion.h2
          className="text-5xl font-bold tracking-wide mb-6 text-[#9FE358]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get the App 🚀 - Launching Soon!
        </motion.h2>

        <p className="text-lg text-[#EAEAEA] max-w-lg mb-8">
          Experience the best of <span className="text-[#9FE358] font-semibold">Referrlyy</span> on your phone.  
          Launching soon for both Android and iOS, stay tuned!
        </p>

        Download Buttons
        <div className="flex gap-6">
          <motion.a
            href="https://get-referred.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg shadow-md border border-cyan-400 transition-all hover:bg-cyan-500 hover:border-cyan-600"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1920px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play Store"
              className="w-40 h-auto"
            />  
          </motion.a>

          <motion.a
            href="https://get-referred.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg shadow-md border border-cyan-400 transition-all hover:bg-cyan-500 hover:border-cyan-600"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-36 h-auto"
            />
          </motion.a>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 border-t border-[#303030] pt-12 flex flex-col md:flex-row justify-between items-center px-10">
        {/* Branding & Info */}
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-semibold text-[#9FE358]">Referrlyy</h3>
          <p className="text-[#EAEAEA]/70 mt-2 max-w-sm">
            Revolutionizing referrals. Join the waitlist and be the first to experience Referrly.
          </p>
        </div>

        {/* Subscribe to Waitlist */}
        <div className="flex flex-col text-center md:text-left mt-8 md:mt-0">
          <h4 className="text-xl font-semibold text-[#EAEAEA] mb-2">Subscribe to Our Waitlist</h4>
          <p className="text-[#EAEAEA]/70 mb-4">Get notified as soon as we launch!</p>

          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-[#1A1A1A] text-[#EAEAEA] border border-[#303030] focus:outline-none focus:ring-2 focus:ring-[#9FE358]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#9FE358] text-[#121212] px-6 py-2 rounded-lg font-medium hover:bg-[#6FBF44] transition-colors"
            >
              Join waitlist
            </button>
          </form>

          {/* Message Alert */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-4 text-sm ${
                message.includes("successfully") ? "text-[#9FE358]" : "text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-[#9FE358] text-sm mt-12">
        &copy; 2025 Referrlyy. All rights reserved.
      </div>
    </div>
  );
};

export default DownloadApp;
