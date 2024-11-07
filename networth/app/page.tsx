'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Service from "./components/Service";
import About from "./components/About";
import Testimonial from "./components/Testimonials";

export default function Page() {
  return (
    <>
    <Navbar/>
    <Home/>
    <About/>
    <Service/>
    <Testimonial/>
    <Footer/>
    </>
  );
}