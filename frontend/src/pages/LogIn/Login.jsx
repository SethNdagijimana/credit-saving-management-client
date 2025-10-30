import { useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import SignUp from "../SignUp/SignUp"

const Login = () => {
  const [activeTab, setActiveTab] = useState("login")
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-4 text-center font-semibold transition-colors ${
                  activeTab === "login"
                    ? "text-white border-b-2 border-primary bg-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-4 text-center font-semibold transition-colors ${
                  activeTab === "signup"
                    ? "text-white border-b-2 border-primary bg-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600">
                    Sign in to access your account
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-[#01381a] transition-colors font-semibold shadow-md hover:shadow-lg">
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && <SignUp />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
