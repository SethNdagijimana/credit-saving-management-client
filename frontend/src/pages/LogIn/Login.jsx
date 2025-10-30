import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../../actions/login-action/login-action"
import NavBar from "../../components/NavBar/NavBar"
import SignUp from "../SignUp/SignUp"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [activeTab, setActiveTab] = useState("login")
  const [errors, setErrors] = useState({ email: "", password: "", submit: "" })
  const [touched, setTouched] = useState({ email: false, password: false })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email address is required"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required"
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long"
    }
    return ""
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors.submit) {
      setErrors((prev) => ({ ...prev, submit: "" }))
    }

    if (touched[field]) {
      const error =
        field === "email" ? validateEmail(value) : validatePassword(value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const value = formData[field]
    const error =
      field === "email" ? validateEmail(value) : validatePassword(value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const isFormValid = () => {
    return (
      formData.email.trim() !== "" &&
      formData.password !== "" &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password)
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    setTouched({ email: true, password: true })

    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        submit: ""
      })
      return
    }

    setLoading(true)
    setErrors({ email: "", password: "", submit: "" })

    try {
      const result = await dispatch(loginUser(formData)).unwrap()

      if (result?.token && result?.user) {
        setFormData({ email: "", password: "" })
        navigate("/dashboard")
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: "Authentication failed. Please try again."
        }))
      }
    } catch (err) {
      let errorMessage = "An error occurred during login. Please try again."

      if (err?.response?.status === 401) {
        errorMessage =
          "Invalid email or password. Please check your credentials."
      } else if (err?.response?.status === 429) {
        errorMessage = "Too many login attempts. Please try again later."
      } else if (err?.response?.status >= 500) {
        errorMessage = "Server error. Please try again later."
      } else if (err?.message) {
        errorMessage = err.message
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message
      }

      setErrors((prev) => ({ ...prev, submit: errorMessage }))
    } finally {
      setLoading(false)
    }
  }

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

            {activeTab === "login" && (
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 ${
                          touched.email && errors.email
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                        } rounded-xl focus:ring-2 transition-all outline-none text-sm sm:text-base`}
                        placeholder="admin@creditjambo.com"
                        autoComplete="email"
                        disabled={loading}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        onBlur={() => handleBlur("password")}
                        className={`w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-4 border-2 ${
                          touched.password && errors.password
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                        } rounded-xl focus:ring-2 transition-all outline-none text-sm sm:text-base`}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                        tabIndex={-1}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isFormValid()}
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-[#01381a] transition-colors font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "signup" && <SignUp />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
