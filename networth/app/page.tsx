'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Service from "./components/Services/Service";
import About from "./components/About/About";
export default function Page() {
  return (
    <>
    <Navbar/>
    <Home/>
    <About/>
    <Service/>
    <Footer/>
    </>
  );

  
}