import React from 'react'
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-20 py-4 bg-background shadow-md">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        <span className="ml-2 text-xl font-semibold text-text">NetWorth</span>
      </div>
      <div>
        <Link href="/login" className="px-4 py-2 text-sm font-medium text-primary hover:text-primary hover:bg-secondary rounded transition duration-300">Log in</Link>
        <Link href="/signup" className="ml-2 px-4 py-2 text-sm font-medium text-background bg-primary rounded-md hover:bg-primary hover:scale-105 transition-transform duration-300">Sign up</Link>
      </div>
    </nav>
  )
}

export default Navbar