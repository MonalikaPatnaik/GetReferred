import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../public/assets/Logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For hamburger menu toggle

  return (
    <header className="bg-white text-black shadow-md">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left side for the menu toggle on mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FiX className="text-3xl text-cyan-400" />
            ) : (
              <FiMenu className="text-3xl text-cyan-400" />
            )}
          </button>
        </div>

        {/* Right side for the logo and name */}
        <div className="flex items-center ml-auto">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="object-contain m-2"
          />
          <span className="text-cyan-400 font-semibold text-lg ml-2">
            Referrly
          </span>
        </div>

        {/* Desktop Links */}
        <nav className={`hidden lg:flex-grow lg:flex lg:justify-end`}>
          <ul className="flex space-x-8">
            <li>
              <Link
                href="#"
                className="text-cyan-400 hover:text-black transition duration-300"
              >
                Who are we?
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-cyan-400 hover:text-black transition duration-300"
              >
                How it Works
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-cyan-400 hover:text-black transition duration-300"
              >
                Testimonials
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden absolute top-full left-0 w-full bg-white text-black shadow-md">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link
                  href="#"
                  className="text-cyan-400 hover:text-black transition duration-300"
                >
                  Who are we?
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-cyan-400 hover:text-black transition duration-300"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-cyan-400 hover:text-black transition duration-300"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
