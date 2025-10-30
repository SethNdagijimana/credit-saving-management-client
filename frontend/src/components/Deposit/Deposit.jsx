import {
  AlertCircle,
  Building,
  CheckCircle,
  CreditCard,
  TrendingUp
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { depositAction } from "../../actions/deposit-action/deposit-action"
import { clearError } from "../../slices/deposit_management_slice"

const Deposit = () => {
  const dispatch = useDispatch()
  const { loading, error, success, message } = useSelector(
    (state) => state.app.depositMngmt
  )
  const { user } = useSelector((state) => state.app.userMngmt || {})

  useEffect(() => {
    dispatch(clearError())

    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, error, dispatch])

  const [depositForm, setDepositForm] = useState({
    amount: "",
    description: "",
    method: "bank_transfer"
  })

  const depositMethods = [
    { id: "bank_transfer", name: "Bank Transfer", icon: Building, fee: 0 },
    { id: "debit_card", name: "Debit Card", icon: CreditCard, fee: 2.5 },
    { id: "credit_card", name: "Credit Card", icon: CreditCard, fee: 3.5 }
  ]

  const quickAmounts = [100, 500, 1000, 5000]

  const handleDeposit = async () => {
    const amount = parseFloat(depositForm.amount)
    if (!amount || amount <= 0) return alert("Please enter a valid amount")
    if (amount < 100) return alert("Minimum deposit amount is RWF 100")
    if (amount > 10000000)
      return alert("Maximum deposit is RWF 10,000,000 per transaction")

    try {
      const payload = {
        amount,
        description: depositForm.description
      }

      await dispatch(depositAction(payload)).unwrap()
      toast.success(`You deposited ${amount} in your account.`)

      setDepositForm({ amount: "", description: "", method: "bank_transfer" })
    } catch (err) {
      console.error("Deposit failed:", err)
    }
  }

  const handleQuickAmount = (amount) => {
    setDepositForm({ ...depositForm, amount: amount.toString() })
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
    return amount + calculateFee()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 shadow-md">
            <CheckCircle className="text-green-600" size={20} />
            <p className="text-green-700 text-sm font-medium">
              {message || "Deposit successful! Your balance will update soon."}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 shadow-sm">
            <AlertCircle className="text-red-600" size={18} />
            <p className="text-red-600 text-sm flex-1">
              {message || "Deposit failed. Please try again."}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6 border-b pb-4">
            <div className="bg-primary p-3 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Deposit Funds
              </h2>
              <p className="text-gray-500 text-sm">Add money to your account</p>
            </div>
          </div>

          {user && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Current Balance
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    RWF{" "}
                    {parseFloat(user.balance || 0).toLocaleString("en-US", {
                      minimumFractionDigits: 2
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-600">Account Number</p>
                  <p className="text-sm font-semibold text-blue-900">
                    {user.account_number || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deposit Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 font-semibold">
                RWF
              </span>
              <input
                type="number"
                value={depositForm.amount}
                onChange={(e) =>
                  setDepositForm({ ...depositForm, amount: e.target.value })
                }
                className="w-full pl-16 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-bold outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleQuickAmount(amt)}
                className="py-2.5 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 font-semibold text-gray-700 text-sm active:scale-95 transition"
              >
                RWF {amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* 🏧 Deposit Method */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deposit Method
            </label>
            <div className="space-y-2">
              {depositMethods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() =>
                      setDepositForm({ ...depositForm, method: method.id })
                    }
                    className={`w-full p-4 border-2 rounded-lg flex justify-between items-center ${
                      depositForm.method === method.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          depositForm.method === method.id
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            depositForm.method === method.id
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {method.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {method.fee === 0
                            ? "No fees"
                            : `${method.fee}% fee applied`}
                        </p>
                      </div>
                    </div>
                    {depositForm.method === method.id && (
                      <CheckCircle className="text-green-500" size={18} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 📝 Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={depositForm.description}
              onChange={(e) =>
                setDepositForm({ ...depositForm, description: e.target.value })
              }
              placeholder="e.g. Salary, Savings"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* 🧾 Summary */}
          {depositForm.amount && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                Transaction Summary
              </h4>
              <div className="flex justify-between text-sm">
                <span>Deposit Amount</span>
                <span className="font-semibold">
                  RWF {parseFloat(depositForm.amount).toLocaleString()}
                </span>
              </div>
              {calculateFee() > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Processing Fee</span>
                  <span className="font-semibold">
                    RWF {calculateFee().toLocaleString()}
                  </span>
                </div>
              )}
              <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-green-700">
                <span>Total</span>
                <span>RWF {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* 💾 Submit */}
          <button
            onClick={handleDeposit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Complete Deposit"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Deposit
