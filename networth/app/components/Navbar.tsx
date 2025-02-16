import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Create a ref for the menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use the offsetTop property for accurate positioning
      const top = section.offsetTop; // Get the top position of the section
      window.scrollTo({
        top: top,
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 text-white shadow-md bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="flex items-center">
        <img src="/assets/logo landing.png" alt="Logo" className="h-8 mr-2" />
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a 
          href="#referral-steps" 
          className="hover:underline transition duration-300 ease-in-out hover:text-[#A8E68D]" 
          onClick={(e) => { e.preventDefault(); scrollToSection('referral-steps'); setIsOpen(false); }}
        >
          How It Works
        </a>
        <a 
          href="#download-app" 
          className="hover:underline transition duration-300 ease-in-out hover:text-[#A8E68D]" 
          onClick={(e) => { e.preventDefault(); scrollToSection('download-app'); setIsOpen(false); }}
        >
          Get the App
        </a>
        <button className="relative px-6 py-2 font-medium rounded-lg bg-[#9FE358] text-[#121212] transition-all hover:bg-[#6FBF44]" onClick={scrollToBottom}>
          Join Waitlist
        </button>
      </div>
      {/* Always visible Join Waitlist button in mobile view */}
      <div className="md:hidden flex items-center space-x-2">
        <button className="relative px-6 py-2 font-medium rounded-lg bg-[#9FE358] text-[#121212] transition-all hover:bg-[#6FBF44]" onClick={scrollToBottom}>
          Join Waitlist
        </button>
        {/* Hamburger Menu for Mobile View */}
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      {/* Collapsible Menu */}
      {isOpen && (
        <div ref={menuRef} className="absolute top-full left-0 bg-[#121212] w-full shadow-lg rounded-md md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <a 
              href="#referral-steps" 
              className="hover:underline transition duration-300 ease-in-out hover:text-[#A8E68D]" 
              onClick={(e) => { e.preventDefault(); scrollToSection('referral-steps'); setIsOpen(false); }}
            >
              How It Works
            </a>
            <a 
              href="#download-app" 
              className="hover:underline transition duration-300 ease-in-out hover:text-[#A8E68D]" 
              onClick={(e) => { e.preventDefault(); scrollToSection('download-app'); setIsOpen(false); }}
            >
              Get the App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;