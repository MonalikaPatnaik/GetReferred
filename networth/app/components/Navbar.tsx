import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center">
        {/* Logo on the left */}
        <h1 className="text-2xl font-bold text-teal-600">ReferAl</h1>

        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-teal-600"
                style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-teal-600"
                style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                For Referrers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-teal-600"
                style={{
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "teal")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                For Referees
              </a>
            </li>
          </ul>
        </nav>

        <div className="ml-6">
          <Link
            href="/login"
            className="text-teal-700 hover:text-teal-700"
            style={{
              borderBottom: "2px solid transparent",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderBottomColor = "teal")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderBottomColor = "transparent")
            }
          >
            Sign In
          </Link>
        </div>

        <div className="ml-4">
          <Link
            href="/signup"
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-mint-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
