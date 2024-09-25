'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Service from "./components/Services/Service";
import AboutPage from "./components/About/About";
export default function Page() {
  return (
    <>
    <Navbar/>
    <Home/>
    <AboutPage/>
    <Service/>
    <Footer/>
    </>
  );

  
}