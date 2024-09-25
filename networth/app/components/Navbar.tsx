import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-600">Referly</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">How it Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">For Referrers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">For Referees</a></li>
              <li><a href="#" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</a></li>
            </ul>
          </nav>
        </div>
      </header>
  )
}

export default Navbar