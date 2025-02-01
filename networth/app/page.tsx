'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Service from "./components/Service";
import About from "./components/About";
import ComingSoon from "./components/ComingSoon";
import DownloadApp from "./components/DownloadApp";

export default function Page() {
  return (
    <>
    <ComingSoon/>
    <About/>
    <DownloadApp/>
    </>
  );
}