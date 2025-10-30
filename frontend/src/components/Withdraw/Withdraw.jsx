import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  TrendingDown
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import withdrawAction from "../../actions/withdraw-action/withdraw-action"
import { clearError } from "../../slices/withdraw_management_slice"

const Withdraw = () => {
  const dispatch = useDispatch()

  const { loading, error, success, message } = useSelector(
    (state) => state.app?.withdrawMngmt
  )
  const { user } = useSelector((state) => state.app.userMngmt || {})

  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    description: ""
  })

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, error, dispatch])

  const quickAmounts = [100, 500, 1000, 2000]

  const handleConfirmWithdraw = async () => {
    const amount = parseFloat(withdrawForm.amount)
    try {
      const payload = {
        amount,
        description: withdrawForm.description
      }

      await dispatch(withdrawAction(payload)).unwrap()
      toast.success("Withdrawal successful!")
    } catch (err) {
      console.error("Withdraw failed:", err)
      toast.error(err || "Withdrawal failed")
    }
  }

  const handleQuickAmount = (amount) => {
    if (amount <= (user?.balance || 0)) {
      setWithdrawForm({ ...withdrawForm, amount: amount.toString() })
    } else {
      toast.error("Insufficient balance for this amount")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 shadow-md">
            <CheckCircle className="text-green-600" size={20} />
            <p className="text-green-700 text-sm font-medium">
              {message ||
                "Withdrawal successful! Your balance will update soon."}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 shadow-sm">
            <AlertCircle className="text-red-600" size={18} />
            <p className="text-red-600 text-sm flex-1">
              {message || "Withdrawal failed. Please try again."}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6 border-b pb-4">
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-3 rounded-lg shadow">
              <TrendingDown className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Withdraw Funds
              </h2>
              <p className="text-gray-500 text-sm">
                Transfer money from your account
              </p>
            </div>
          </div>

          {user && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-red-600 font-medium">
                    Available Balance
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    RWF{" "}
                    {parseFloat(user.balance || 0).toLocaleString("en-US", {
                      minimumFractionDigits: 2
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-red-600">Account Number</p>
                  <p className="text-sm font-semibold text-red-900">
                    {user.account_number || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Withdrawal Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 font-semibold">
                RWF
              </span>
              <input
                type="number"
                value={withdrawForm.amount}
                onChange={(e) =>
                  setWithdrawForm({ ...withdrawForm, amount: e.target.value })
                }
                className="w-full pl-16 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg font-bold outline-none"
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
                className="py-2.5 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 font-semibold text-gray-700 text-sm active:scale-95 transition"
              >
                RWF {amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              placeholder="e.g., Shopping, Emergency"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>

          <button
            onClick={handleConfirmWithdraw}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Withdraw"}
          </button>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-2">
            <AlertTriangle className="text-yellow-600" size={16} />
            <p className="text-xs text-yellow-800">
              Please ensure your details are correct — withdrawals cannot be
              reversed once processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw
