'use client';
import { useEffect } from 'react';
import About from "./components/About";
import ComingSoon from "./components/ComingSoon";
import DownloadApp from "./components/DownloadApp";
import Navbar from "./components/Navbar";
import ReferralSteps from "./components/ReferralSteps";
import initCursorAnimation from "./cursorani";

export default function Page() {
  useEffect(() => {
    initCursorAnimation(); // Call the cursor animation function
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <div id="coming-soon">
        <ComingSoon />
      </div>
      <div id="referral-steps">
        <ReferralSteps />
      </div>
      <div id="download-app">
        <DownloadApp />
      </div>
      <div id="get-notified">
        {/* You can add a section here for "Get Notified" if needed */}
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
