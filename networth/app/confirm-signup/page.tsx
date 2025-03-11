'use client';
import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import initCursorAnimation from "../cursorani";

export default function Confirm() {
  useEffect(() => {
    initCursorAnimation(); // Call the cursor animation function
  }, []);

  return (
    <div className="h-screen bg-[#121212] text-white overflow-hidden">
      <nav className="flex justify-between items-center px-6 py-4 text-white shadow-md bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
  <div className="flex items-center">
    <img src="/assets/logo landing.png" alt="Logo" className="h-8 mr-2" />
  </div>
 
</nav>
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center mt-40">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <span className="text-white text-3xl">✔</span> {/* Checkmark icon */}
        </div>
        <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
        <p className="text-lg mb-4 mx-4">Your email has been verified. You can now login to the application.</p>
      </div>
      {/* Cursor Circles */}
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  );
}
