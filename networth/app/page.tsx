'use client';
import About from "./components/About";
import ComingSoon from "./components/ComingSoon";
import DownloadApp from "./components/DownloadApp";
import Navbar from "./components/Navbar";
import ReferralSteps from "./components/ReferralSteps";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-black to-cyan-900 text-white">
      <ComingSoon />
      <ReferralSteps />
      <DownloadApp />
    </div>
  );
}
