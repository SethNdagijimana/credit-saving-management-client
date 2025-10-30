import {
  Activity,
  AlertCircle,
  CreditCard,
  Eye,
  EyeOff,
  TrendingDown,
  TrendingUp
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import getTransactionsAction from "../../actions/transaction-action/transaction-action"

const ClientDashboard = () => {
  const { user } = useSelector((state) => state?.app?.userMngmt || {})
  const { transactions = [] } = useSelector(
    (state) => state.app?.transactionMngmt
  )

  const [showBalance, setShowBalance] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5

  useEffect(() => {
    dispatch(getTransactionsAction({ page: currentPage, limit }))
  }, [dispatch, currentPage])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-primary rounded-2xl shadow-2xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {user.name}! 👋
                </h2>
                <p className="text-blue-100 flex items-center space-x-2">
                  <CreditCard size={16} />
                  <span>{user.account_number}</span>
                </p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
              >
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="mb-2">
              <p className="text-blue-100 text-sm mb-1">Available Balance</p>
              <h3 className="text-5xl font-bold">
                {showBalance ? `RWF${user.balance}` : "******"}
              </h3>
            </div>
          </div>
        </div>

        {user.balance < 1000 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle
                className="text-yellow-600 mr-3 flex-shrink-0"
                size={24}
              />
              <div>
                <p className="font-semibold text-yellow-800">
                  Low Balance Warning
                </p>
                <p className="text-yellow-700 text-sm">
                  Your account balance is below RWF 1,000. Consider depositing
                  funds to avoid service interruptions.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => navigate("/dashboard/deposit")}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-4 rounded-xl">
                <TrendingUp className="text-green-600" size={32} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">Deposit</h3>
                <p className="text-sm text-gray-600">Add funds</p>
              </div>
            </div>
          </button>

          {/* Withdraw */}
          <button
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => navigate("/dashboard/withdraw")}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-4 rounded-xl">
                <TrendingDown className="text-red-600" size={32} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">Withdraw</h3>
                <p className="text-sm text-gray-600">Transfer out</p>
              </div>
            </div>
          </button>

          {/* Transaction History */}
          <button
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => navigate("/dashboard/transaction-history")}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <Activity className="text-blue-600" size={32} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">History</h3>
                <p className="text-sm text-gray-600">View all</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Recent Transactions
            </h3>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View All →
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Activity size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                )
                .slice(0, 5)
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          transaction.type === "deposit"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <TrendingUp className="text-green-600" size={24} />
                        ) : (
                          <TrendingDown className="text-red-600" size={24} />
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {transaction.description?.trim()
                            ? transaction.description
                            : "No description for this transaction"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.createdAt
                            ? new Date(transaction.createdAt).toLocaleString()
                            : "Date unavailable"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "deposit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}$
                        {Number(transaction.amount).toFixed(2)}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
                        {transaction.status || "Completed"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
