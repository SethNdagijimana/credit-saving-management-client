import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#001c0d] transition-colors font-medium"
            >
              Home
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-[#001c0d] transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-[#001c0d] transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-[#001c0d] transition-colors font-medium"
            >
              Contact
            </a>
            <Link
              to="/login"
              className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-[#01381a] transition-all shadow-md hover:shadow-lg font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
            <Link
              to="/"
              className="block text-gray-700 hover:text-[#001c0d] transition-colors"
            >
              Home
            </Link>
            <a
              href="#about"
              className="block text-gray-700 hover:text-[#001c0d] transition-colors"
            >
              About
            </a>
            <a
              href="#products"
              className="block text-gray-700 hover:text-[#001c0d] transition-colors"
            >
              Products
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-[#001c0d] transition-colors"
            >
              Contact
            </a>
            <Link
              to="/login"
              className="block bg-primary text-white px-6 py-2.5 rounded-lg text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}

export default NavBar
