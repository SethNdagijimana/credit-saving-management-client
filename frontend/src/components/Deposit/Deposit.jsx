import {
  AlertCircle,
  Building,
  CheckCircle,
  CreditCard,
  Info,
  TrendingUp
} from "lucide-react"
import { useState } from "react"

const Deposit = () => {
  const [depositForm, setDepositForm] = useState({
    amount: "",
    description: "",
    method: "bank_transfer"
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const user = {
    balance: 5420.5,
    accountNumber: "ACC-2024-001"
  }

  const depositMethods = [
    { id: "bank_transfer", name: "Bank Transfer", icon: Building, fee: 0 },
    { id: "debit_card", name: "Debit Card", icon: CreditCard, fee: 2.5 },
    { id: "credit_card", name: "Credit Card", icon: CreditCard, fee: 3.5 }
  ]

  const quickAmounts = [100, 500, 1000, 5000]

  const handleDeposit = () => {
    setError("")
    setSuccess(false)

    const amount = parseFloat(depositForm.amount)

    // Validation
    if (!depositForm.amount || amount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (amount < 100) {
      setError("Minimum deposit amount is RWF 100")
      return
    }

    if (amount > 10000000) {
      setError("Maximum deposit amount is RWF 10,000,000 per transaction")
      return
    }

    // Calculate fee
    const selectedMethod = depositMethods.find(
      (m) => m.id === depositForm.method
    )
    const fee = (amount * selectedMethod.fee) / 100
    const totalAmount = amount + fee

    // Mock deposit - In real app, call API here
    console.log("Deposit details:", {
      amount: amount,
      fee: fee,
      total: totalAmount,
      method: depositForm.method,
      description: depositForm.description
    })

    setSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setDepositForm({ amount: "", description: "", method: "bank_transfer" })
      setSuccess(false)
    }, 3000)
  }

  const handleQuickAmount = (amount) => {
    setDepositForm({ ...depositForm, amount: amount.toString() })
    setError("")
  }

  const calculateFee = () => {
    const amount = parseFloat(depositForm.amount) || 0
    const selectedMethod = depositMethods.find(
      (m) => m.id === depositForm.method
    )
    return (amount * selectedMethod.fee) / 100
  }

  const calculateTotal = () => {
    const amount = parseFloat(depositForm.amount) || 0
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
                Deposit Successful!
              </p>
              <p className="text-xs sm:text-sm text-green-700">
                Your funds will be available shortly.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="bg-primary p-2.5 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                Deposit Funds
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Add money to your account
              </p>
            </div>
          </div>

          {/* Current Balance */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div>
                <p className="text-xs sm:text-sm text-blue-600 font-medium">
                  Current Balance
                </p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">
                  RWF{" "}
                  {user.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-blue-600">Account Number</p>
                <p className="text-xs sm:text-sm font-semibold text-blue-900">
                  {user.accountNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl flex items-start space-x-3 shadow-sm">
              <AlertCircle
                className="text-red-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-red-600 text-xs sm:text-sm flex-1">{error}</p>
            </div>
          )}

          {/* Deposit Amount */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Deposit Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-500 text-lg sm:text-2xl font-bold">
                RWF
              </span>
              <input
                type="number"
                step="0.01"
                value={depositForm.amount}
                onChange={(e) => {
                  setDepositForm({ ...depositForm, amount: e.target.value })
                  setError("")
                }}
                className="w-full pl-16 sm:pl-20 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xl sm:text-2xl font-bold transition outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="flex items-start space-x-1 mt-2">
              <Info size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                Min: RWF 100 | Max: RWF 10,000,000
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
                  className="py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition font-semibold text-gray-700 text-sm sm:text-base active:scale-95 transform"
                >
                  RWF {amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Deposit Method */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Deposit Method
            </label>
            <div className="space-y-2 sm:space-y-3">
              {depositMethods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() =>
                      setDepositForm({ ...depositForm, method: method.id })
                    }
                    className={`w-full p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition flex items-center justify-between active:scale-98 transform ${
                      depositForm.method === method.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                          depositForm.method === method.id
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={
                            depositForm.method === method.id
                              ? "text-green-600"
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
                          {method.fee === 0
                            ? "No fees"
                            : `${method.fee}% processing fee`}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                        depositForm.method === method.id
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {depositForm.method === method.id && (
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
              value={depositForm.description}
              onChange={(e) =>
                setDepositForm({ ...depositForm, description: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base outline-none"
              placeholder="e.g., Salary, Savings"
            />
          </div>

          {/* Summary */}
          {depositForm.amount && parseFloat(depositForm.amount) > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
                Transaction Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Deposit Amount</span>
                  <span className="font-semibold text-gray-800">
                    RWF{" "}
                    {parseFloat(depositForm.amount).toLocaleString("en-US", {
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
                    Total Amount
                  </span>
                  <span className="font-bold text-green-600 text-base sm:text-lg">
                    RWF{" "}
                    {calculateTotal().toLocaleString("en-US", {
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
            onClick={handleDeposit}
            disabled={
              !depositForm.amount || parseFloat(depositForm.amount) <= 0
            }
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:from-green-600 hover:to-green-700 active:scale-98 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Complete Deposit
          </button>

          {/* Security Note */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800 text-center leading-relaxed">
              🔒 All transactions are encrypted and secure. Your information is
              protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit
