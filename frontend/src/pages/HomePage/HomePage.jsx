import { Sparkles, Target, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import Logo from "../../components/Logo/Logo"
import NavBar from "../../components/NavBar/NavBar"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50">
      <NavBar />

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary">
                <span className=" block">Fast</span>
                <span className=" block">Simple</span>
                <span className=" block">Flexible</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              We provide fast, simple, and collateral-free micro-loans tailored
              for low-income earners & SMEs, with low interest rates,
              streamlined vetting, and credit score improvement.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-xl font-semibold text-lg"
              >
                Apply Now
              </Link>
              <Link
                to="/login"
                className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-50 transition-all shadow-md border-2 border-primary font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-xl bg-yellow-50 group-hover:bg-yellow-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <Zap className="w-8 h-8 text-yellow-600 group-hover:text-yellow-700" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Speed & Agility
                </p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <Target className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Flexibility
                </p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <Sparkles className="w-8 h-8 text-purple-600 group-hover:text-purple-700" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Simplicity
                </p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="h-4 bg-green-600 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="bg-yellow-400 rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="h-4 bg-white rounded w-2/3 mb-3"></div>
                    <div className="h-3 bg-white/50 rounded w-1/2"></div>
                  </div>
                  <div className="bg-red-500 rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="h-4 bg-white rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-white/50 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="mt-4 text-gray-400 text-sm">
                Fast, simple, and flexible micro-loans for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
