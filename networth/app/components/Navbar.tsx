import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { FiUser } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <h1 className="text-2xl font-bold text-teal-600">ReferAl</h1>

        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-6">
            <li><Link href="#">How it Works</Link></li>
            <li><Link href="#">For Referrers</Link></li>
            <li><Link href="#">For Referees</Link></li>
          </ul>
        </nav>

        {currentUser ? (
          <div className="ml-6 relative">
            <div
              ref={accountRef}
              className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100"
              onMouseEnter={() => setIsDropdownVisible(true)}
            >
              <FiUser className="text-teal-600 mr-2" />
              <span className="text-teal-600">{currentUser.displayName || "Account"}</span>
            </div>
            {isDropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <ul className="py-2">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-teal-50">
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/applications" className="block px-4 py-2 text-gray-700 hover:bg-teal-50">
                      My Applications
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-teal-50"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="ml-6">
              <Link href="/login">Sign In</Link>
            </div>
            <div className="ml-4">
              <Link href="/signup">
                <div className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  Sign Up
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;