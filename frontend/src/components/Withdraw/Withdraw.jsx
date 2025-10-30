import {
  AlertCircle,
  AlertTriangle,
  Building,
  CheckCircle,
  CreditCard,
  Info,
  Lock,
  Smartphone,
  TrendingDown
} from "lucide-react"
import { useState } from "react"

const Withdraw = () => {
  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    description: "",
    method: "bank_transfer",
    pin: ""
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPinConfirm, setShowPinConfirm] = useState(false)

  const user = {
    balance: 5420.5,
    accountNumber: "ACC-2024-001"
  }

  const withdrawMethods = [
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: Building,
      fee: 0
    },
    {
      id: "instant_transfer",
      name: "Instant Transfer",
      icon: Smartphone,
      fee: 1.5,
      processingTime: "Instant"
    },
    {
      id: "atm",
      name: "ATM Withdrawal",
      icon: CreditCard,
      fee: 2.0,
      processingTime: "Instant"
    }
  ]

  const quickAmounts = [100, 500, 1000, 2000]

  const handleWithdrawClick = () => {
    setError("")

    const amount = parseFloat(withdrawForm.amount)

    // Validation
    if (!withdrawForm.amount || amount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (amount < 100) {
      setError("Minimum withdrawal amount is RWF 100")
      return
    }

    if (amount > user.balance) {
      setError(
        "Insufficient balance. Please enter an amount less than or equal to your available balance."
      )
      return
    }

    if (amount > 10000000) {
      setError("Maximum withdrawal amount is RWF 10,000,000 per transaction")
      return
    }

    // Show PIN confirmation
    setShowPinConfirm(true)
  }

  const handleConfirmWithdraw = () => {
    setError("")

    if (!withdrawForm.pin || withdrawForm.pin.length !== 4) {
      setError("Please enter a valid 4-digit PIN")
      return
    }

    const amount = parseFloat(withdrawForm.amount)
    const selectedMethod = withdrawMethods.find(
      (m) => m.id === withdrawForm.method
    )
    const fee = (amount * selectedMethod.fee) / 100
    const totalDeduction = amount + fee

    // Mock withdrawal - In real app, call API here
    console.log("Withdrawal details:", {
      amount: amount,
      fee: fee,
      total: totalDeduction,
      method: withdrawForm.method,
      description: withdrawForm.description,
      pin: "****"
    })

    setSuccess(true)
    setShowPinConfirm(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setWithdrawForm({
        amount: "",
        description: "",
        method: "bank_transfer",
        pin: ""
      })
      setSuccess(false)
    }, 3000)
  }

  const handleQuickAmount = (amount) => {
    if (amount <= user.balance) {
      setWithdrawForm({ ...withdrawForm, amount: amount.toString() })
      setError("")
    } else {
      setError("Insufficient balance for this amount")
    }
  }

  const calculateFee = () => {
    const amount = parseFloat(withdrawForm.amount) || 0
    const selectedMethod = withdrawMethods.find(
      (m) => m.id === withdrawForm.method
    )
    return (amount * selectedMethod.fee) / 100
  }

  const calculateTotal = () => {
    const amount = parseFloat(withdrawForm.amount) || 0
    const fee = calculateFee()
    return amount + fee
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl flex items-start sm:items-center space-x-3 shadow-md animate-pulse">
            <CheckCircle
              className="text-green-600 flex-shrink-0 mt-0.5 sm:mt-0"
              size={20}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-green-800 text-sm sm:text-base">
                Withdrawal Successful!
              </p>
              <p className="text-xs sm:text-sm text-green-700">
                Your request is being processed.
              </p>
            </div>
          </div>
        )}

        {/* PIN Confirmation Modal */}
        {showPinConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-4 sm:mb-6">
                <div className="bg-red-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Lock className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Confirm Withdrawal
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter your 4-digit PIN to confirm
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                  <AlertCircle
                    className="text-red-600 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p className="text-red-600 text-xs sm:text-sm flex-1">
                    {error}
                  </p>
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Security PIN
                </label>
                <input
                  type="password"
                  maxLength="4"
                  inputMode="numeric"
                  value={withdrawForm.pin}
                  onChange={(e) =>
                    setWithdrawForm({
                      ...withdrawForm,
                      pin: e.target.value.replace(/\D/g, "")
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-center text-xl sm:text-2xl tracking-widest outline-none"
                  placeholder="••••"
                  autoFocus
                />
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200">
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-600">Withdrawal Amount</span>
                  <span className="font-semibold">
                    RWF{" "}
                    {parseFloat(withdrawForm.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
                {calculateFee() > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-semibold">
                      RWF{" "}
                      {calculateFee().toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                  <span className="font-semibold text-sm sm:text-base">
                    Total Deduction
                  </span>
                  <span className="font-bold text-red-600 text-base sm:text-lg">
                    RWF{" "}
                    {calculateTotal().toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={() => {
                    setShowPinConfirm(false)
                    setWithdrawForm({ ...withdrawForm, pin: "" })
                    setError("")
                  }}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmWithdraw}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-red-600 hover:to-red-700 active:scale-95 transition shadow-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Withdrawal Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-2.5 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
              <TrendingDown className="text-white" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                Withdraw Funds
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Transfer money from your account
              </p>
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div>
                <p className="text-xs sm:text-sm text-red-600 font-medium">
                  Available Balance
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-900">
                  RWF{" "}
                  {user.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-red-600">Account Number</p>
                <p className="text-xs sm:text-sm font-semibold text-red-900">
                  {user.accountNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && !showPinConfirm && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl flex items-start space-x-3 shadow-sm">
              <AlertCircle
                className="text-red-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-red-600 text-xs sm:text-sm flex-1">{error}</p>
            </div>
          )}

          {/* Withdrawal Amount */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Withdrawal Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-500 text-lg sm:text-2xl font-bold">
                RWF
              </span>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={withdrawForm.amount}
                onChange={(e) => {
                  setWithdrawForm({ ...withdrawForm, amount: e.target.value })
                  setError("")
                }}
                className="w-full pl-16 sm:pl-20 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-xl sm:text-2xl font-bold transition outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="flex items-start space-x-1 mt-2">
              <Info size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                Min: RWF 100 | Max: RWF 10,000,000 | Available: RWF{" "}
                {user.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Quick Amounts
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickAmount(amount)}
                  disabled={amount > user.balance}
                  className={`py-2.5 sm:py-3 px-3 sm:px-4 border-2 rounded-lg transition font-semibold text-sm sm:text-base active:scale-95 transform ${
                    amount > user.balance
                      ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                      : "border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50"
                  }`}
                >
                  RWF {amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Withdrawal Method */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Withdrawal Method
            </label>
            <div className="space-y-2 sm:space-y-3">
              {withdrawMethods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() =>
                      setWithdrawForm({ ...withdrawForm, method: method.id })
                    }
                    className={`w-full p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition flex items-center justify-between active:scale-98 transform ${
                      withdrawForm.method === method.id
                        ? "border-red-500 bg-red-50 shadow-md"
                        : "border-gray-300 hover:border-red-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                          withdrawForm.method === method.id
                            ? "bg-red-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={
                            withdrawForm.method === method.id
                              ? "text-red-600"
                              : "text-gray-600"
                          }
                          size={20}
                        />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {method.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {method.fee === 0 ? "No fees" : `${method.fee}% fee`}{" "}
                          • {method.processingTime}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                        withdrawForm.method === method.id
                          ? "border-red-500 bg-red-500"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {withdrawForm.method === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Description (Optional)
            </label>
            <input
              type="text"
              value={withdrawForm.description}
              onChange={(e) =>
                setWithdrawForm({
                  ...withdrawForm,
                  description: e.target.value
                })
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-sm sm:text-base outline-none"
              placeholder="e.g., Emergency, Shopping"
            />
          </div>

          {/* Summary */}
          {withdrawForm.amount && parseFloat(withdrawForm.amount) > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
                Transaction Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Withdrawal Amount</span>
                  <span className="font-semibold text-gray-800">
                    RWF{" "}
                    {parseFloat(withdrawForm.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
                {calculateFee() > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-semibold text-gray-800">
                      RWF{" "}
                      {calculateFee().toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    Total Deduction
                  </span>
                  <span className="font-bold text-red-600 text-base sm:text-lg">
                    RWF{" "}
                    {calculateTotal().toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    Remaining Balance
                  </span>
                  <span className="font-bold text-blue-600 text-base sm:text-lg">
                    RWF{" "}
                    {(user.balance - calculateTotal()).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleWithdrawClick}
            disabled={
              !withdrawForm.amount || parseFloat(withdrawForm.amount) <= 0
            }
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:from-red-600 hover:to-red-700 active:scale-98 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Proceed to Withdraw
          </button>

          {/* Security Note */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle
                size={16}
                className="text-yellow-600 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-yellow-800 leading-relaxed">
                Please ensure withdrawal details are correct. Transactions
                cannot be reversed once processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw
