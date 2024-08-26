import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-text mb-2">NetWorth</h2>
            <p className="text-sm text-text font-normal">Because your Network <br />  is your Networth</p>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0 pl-60">
            <ul className="text-sm">
              <li className="mb-2"><Link href="/" className="text-primary font-medium">Home</Link></li>
              <li className="mb-2"><Link href="/signup" className="text-primary font-medium">Get Started</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-primary font-medium">Contact us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer