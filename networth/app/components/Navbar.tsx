import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { auth, firestore } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import logo from "../../public/assets/Logo.jpg";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For hamburger menu toggle
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
          setName(userDoc.data().name);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
        setName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      window.location.href = "/";
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

  const displayName = currentUser?.displayName
    ? `Welcome ${currentUser.displayName}`
    : name
    ? `Welcome ${name}`
    : "Account";

  return (
    <header className="bg-white shadow-md relative">
      <div className="mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="object-contain m-2"
          />
          <Link href="/" className="text-3xl font-bold text-teal-600">
            Referrly
          </Link>
        </div>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FiX className="text-3xl text-teal-600" />
            ) : (
              <FiMenu className="text-3xl text-teal-600" />
            )}
          </button>
        </div>

        <nav className={`hidden lg:flex-grow lg:flex lg:justify-end`}>
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className=" text-gray-600 hover:text-teal-600" style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }>
                Who are we?
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-teal-600" style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }>
                How it Works
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-teal-600" style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }>
                Testimonials
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger menu for small screens */}
        {isMenuOpen && (
          <nav className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600" style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }>
                  Who are we?
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600"style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }>
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600"style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }>
                  Testimonials
                </Link>
              </li>
              {/* <li> */}
              {currentUser ? (
                <div className="relative">
                  <div
                    ref={accountRef}
                    className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100"
                    onMouseEnter={() => setIsDropdownVisible(true)}
                  >
                    <FiUser className="text-teal-600 mr-2" />
                    <span className="text-teal-600">
                      {displayName}
                    </span>
                  </div>
                  {isDropdownVisible && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                      onMouseLeave={() => setIsDropdownVisible(false)}
                    >
                      <ul className="py-2">
                        <li>
                          <Link
                            href={
                              role === "referrer"
                                ? "/Dashboard"
                                : "/Profile"
                            }
                            className="block px-4 py-2 text-gray-700 hover:bg-teal-50"
                          >
                            {role === "referrer"
                              ? "View Dashboard"
                              : "Profile Settings"}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/Dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-teal-50"
                          >
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
                <ul className="flex flex-col items-center space-y-4 py-4">
                  <li>
                    <Link
                      href="/LogIn"
                      className="text-gray-600 hover:text-teal-600"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/SignUp">
                      <div className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                        Sign Up
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
              {/* </li> */}
            </ul>
          </nav>
        )}

        {/* User Account/Sign In - Large Screens */}
        <div className="hidden lg:flex lg:items-center">
          {currentUser ? (
            <div className="ml-6 relative">
              <div
                ref={accountRef}
                className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100"
                onMouseEnter={() => setIsDropdownVisible(true)}
              >
                <FiUser className="text-teal-600 mr-2" />
                <span className="text-teal-600">
                  {displayName}
                </span>
              </div>
              {isDropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                  onMouseLeave={() => setIsDropdownVisible(false)}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href={
                          role === "referrer"
                            ? "/Dashboard"
                            : "/Profile"
                        }
                        className="block px-4 py-2 text-gray-700 hover:bg-teal-50"
                      >
                        {role === "referrer"
                          ? "View Dashboard"
                          : "Profile Settings"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-teal-50"
                      >
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
                <Link
                  href="/LogIn"
                  className="text-gray-600 hover:text-teal-600"
                >
                  Sign In
                </Link>
              </div>
              <div className="ml-4">
                <Link href="/SignUp">
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                    Sign Up
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
