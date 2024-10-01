import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Make sure firebase is properly initialized
import { onAuthStateChanged, signOut, User } from "firebase/auth"; // Import 'User' from firebase
import { FiUser } from "react-icons/fi"; // Icon for account
import Link from "next/link";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Reset user after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center">
        {/* Logo on the left */}
        <h1 className="text-2xl font-bold text-teal-600">ReferAl</h1>

        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="#">How it Works</Link>
            </li>
            <li>
              <Link href="#">For Referrers</Link>
            </li>
            <li>
              <Link href="#">For Referees</Link>
            </li>
          </ul>
        </nav>

        {/* Account or Sign In/Up buttons */}
        {currentUser ? (
          <div className="ml-6 relative flex items-center space-x-2">
            <FiUser className="text-teal-600" />
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              <button className="text-teal-600">{currentUser.displayName || "Account"}</button>
              {isDropdownVisible && (
                <div className="absolute mt-2 right-0 bg-white border rounded-md shadow-lg w-48">
                  <ul className="py-2">
                    <li>
                      <Link href="/profile">Profile Settings</Link>
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
