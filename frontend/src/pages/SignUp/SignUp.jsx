import { Check, Eye, EyeOff, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { registerUser } from "../../actions/login-action/login-action"
import { clearError } from "../../slices/user_management_slice"

const SignUp = () => {
  const dispatch = useDispatch()
  const { loading, error, success, message } = useSelector(
    (state) => state.app?.userMngmt
  )

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, error, dispatch])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touched, setTouched] = useState({})

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Weak", color: "bg-red-500" },
      { strength: 2, label: "Fair", color: "bg-orange-500" },
      { strength: 3, label: "Good", color: "bg-yellow-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
      { strength: 5, label: "Very Strong", color: "bg-green-600" }
    ]

    return levels[strength]
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required"
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid phone number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone_number: true,
      password: true,
      confirmPassword: true
    })

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    const payload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      password: formData.password
    }

    try {
      await dispatch(registerUser(payload)).unwrap()
      toast.success(
        "Account created successfully! Wait for verification to login."
      )

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: ""
      })
      setErrors({})
      setTouched({})
    } catch (err) {
      const errorMsg =
        err?.message || message || "Signup failed. Please try again."
      toast.error(errorMsg)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Join us and get started today
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
                placeholder="John"
                className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  touched.firstName && errors.firstName
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : touched.firstName && formData.firstName
                    ? "border-green-500 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {touched.firstName && errors.firstName && (
                <div className="flex items-center gap-1 mt-1.5">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{errors.firstName}</p>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                placeholder="Doe"
                className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  touched.lastName && errors.lastName
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : touched.lastName && formData.lastName
                    ? "border-green-500 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {touched.lastName && errors.lastName && (
                <div className="flex items-center gap-1 mt-1.5">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{errors.lastName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="youremail@example.com"
              className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                touched.email && errors.email
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : touched.email && formData.email
                  ? "border-green-500 focus:ring-green-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {touched.email && errors.email && (
              <div className="flex items-center gap-1 mt-1.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{errors.email}</p>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              onBlur={() => handleBlur("phone_number")}
              placeholder="+250 XXX XXX XXX"
              className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                touched.phone_number && errors.phone_number
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : touched.phone_number && formData.phone_number
                  ? "border-green-500 focus:ring-green-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {touched.phone_number && errors.phone_number && (
              <div className="flex items-center gap-1 mt-1.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{errors.phone_number}</p>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                placeholder="Create a strong password"
                className={`w-full px-4 py-2.5 sm:py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  touched.password && errors.password
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : touched.password &&
                      formData.password &&
                      passwordStrength.strength >= 3
                    ? "border-green-500 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.strength
                          ? passwordStrength.color
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                {passwordStrength.label && (
                  <p className="text-xs text-gray-600">
                    Strength:{" "}
                    <span className="font-medium">
                      {passwordStrength.label}
                    </span>
                  </p>
                )}
              </div>
            )}

            {touched.password && errors.password && (
              <div className="flex items-center gap-1 mt-1.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{errors.password}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="Confirm your password"
                className={`w-full px-4 py-2.5 sm:py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : touched.confirmPassword &&
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword
                    ? "border-green-500 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {touched.confirmPassword &&
              !errors.confirmPassword &&
              formData.confirmPassword && (
                <div className="flex items-center gap-1 mt-1.5">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-600">Passwords match</p>
                </div>
              )}

            {touched.confirmPassword && errors.confirmPassword && (
              <div className="flex items-center gap-1 mt-1.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 sm:py-3.5 rounded-lg hover:bg-green-800 active:bg-green-800 transition-colors font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Backend error message */}
          {error && message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Registration Failed
                  </p>
                  <p className="text-sm text-red-600 mt-1">{message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default SignUp
