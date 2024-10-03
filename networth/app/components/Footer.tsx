import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-400">Our Story</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Team</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-400">Blog</Link></li>
            <li><Link href="#" className="hover:text-blue-400">FAQ</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Support</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-400">Twitter</Link></li>
            <li><Link href="#" className="hover:text-blue-400">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Facebook</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p> Referrly &copy;{new Date().getFullYear()}&nbsp; All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer