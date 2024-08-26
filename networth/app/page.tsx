import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col my-16">
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold text-text text-center mb-4">
            <span className="block mb-2">Land your dream job</span>
            4x faster
          </h1>
          <p className="text-xl text-text text-center">
            Get referred to your dream company or become a referrer
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className="px-6 py-3 text-base font-semibold text-background bg-primary rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}