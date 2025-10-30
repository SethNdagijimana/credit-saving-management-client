import {
  Activity,
  Calendar,
  DollarSign,
  Download,
  Eye,
  Filter,
  Search,
  TrendingDown,
  TrendingUp
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import getTransactionsAction from "../../actions/transaction-action/transaction-action"
import Loading from "../Loading"
import TransactionModal from "./TransactionModal" // Import the new modal component

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const dispatch = useDispatch()
  const { transactions, pagination, loading } = useSelector(
    (state) => state.app?.transactionMngmt
  )

  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5

  useEffect(() => {
    dispatch(getTransactionsAction({ page: currentPage, limit }))
  }, [dispatch, currentPage])

  const filteredTransactions = (transactions || []).filter((txn) => {
    const matchesSearch =
      txn.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      filterType === "all" ||
      (filterType === "deposit" && txn.type === "deposit") ||
      (filterType === "withdrawal" && txn.type === "withdraw")

    let matchesPeriod = true
    if (filterPeriod !== "all") {
      const txnDate = new Date(txn.createdAt)
      const today = new Date()
      const daysDiff = Math.floor((today - txnDate) / (1000 * 60 * 60 * 24))

      if (filterPeriod === "today") matchesPeriod = daysDiff === 0
      else if (filterPeriod === "week") matchesPeriod = daysDiff <= 7
      else if (filterPeriod === "month") matchesPeriod = daysDiff <= 30
    }

    return matchesSearch && matchesType && matchesPeriod
  })

  const totalDeposits = filteredTransactions
    .filter((txn) => txn.type === "deposit")
    .reduce((sum, txn) => sum + txn.amount, 0)

  const totalWithdrawals = filteredTransactions
    .filter((txn) => txn.type === "withdraw")
    .reduce((sum, txn) => sum + txn.amount, 0)

  const handleExport = () => {
    console.log("Exporting transactions...")
    alert("Transaction history exported successfully!")
  }

  const totalPages = pagination?.totalPages || 1

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-4 rounded-xl">
              <Activity className="text-blue-600" size={36} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Transaction History
              </h2>
              <p className="text-gray-600">
                View all your account transactions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingUp size={28} />
              </div>
              <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                {
                  filteredTransactions.filter((t) => t.type === "deposit")
                    .length
                }{" "}
                transactions
              </span>
            </div>
            <p className="text-sm text-green-100 mb-1">Total Deposits</p>
            <p className="text-3xl font-bold">RWF {totalDeposits.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingDown size={28} />
              </div>
              <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                {
                  filteredTransactions.filter((t) => t.type === "withdraw")
                    .length
                }{" "}
                transactions
              </span>
            </div>
            <p className="text-sm text-red-100 mb-1">Total Withdrawals</p>
            <p className="text-3xl font-bold">
              RWF {totalWithdrawals.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <DollarSign size={28} />
              </div>
              <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                {filteredTransactions.length} total
              </span>
            </div>
            <p className="text-sm text-blue-100 mb-1">Net Change</p>
            <p className="text-3xl font-bold">
              RWF {(totalDeposits - totalWithdrawals).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Transactions
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by description or account number..."
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transaction Type
              </label>
              <div className="relative">
                <Filter
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                </select>
              </div>
            </div>

            {/* Time Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time Period
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Export */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <Activity size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg font-semibold mb-2">
                No transactions found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Account
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-white">
                      Amount
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-gray-700">
                        {new Date(txn.createdAt).toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-sm font-semibold ${
                            txn.type === "deposit"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {txn.accountNumber}
                      </td>
                      <td
                        className={`py-4 px-6 text-right font-bold ${
                          txn.type === "deposit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {txn.type === "deposit" ? "+" : "-"}RWF{" "}
                        {txn.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => setSelectedTransaction(txn)}
                          className="p-2 text-primary hover:primary rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center py-4 space-x-4 border-t bg-gray-50">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Use the new TransactionModal component */}
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      </div>
    </div>
  )
}

export default TransactionHistory
