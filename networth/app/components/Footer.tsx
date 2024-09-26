import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Our Story</a></li>
            <li><a href="#" className="hover:text-blue-400">Team</a></li>
            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400">Support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
            <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 Referly. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer