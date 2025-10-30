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
import { useState } from "react"

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const user = {
    accountNumber: "ACC-2024-001",
    balance: 5420.5
  }

  // Mock transactions data
  const allTransactions = [
    {
      id: 15,
      type: "deposit",
      amount: 4270.5,
      description: "Transfer from savings",
      date: "2024-10-29",
      time: "10:30 AM",
      status: "completed",
      reference: "TXN-2024-15",
      method: "Bank Transfer"
    },
    {
      id: 14,
      type: "withdrawal",
      amount: 150,
      description: "Online purchase",
      date: "2024-10-28",
      time: "03:45 PM",
      status: "completed",
      reference: "TXN-2024-14",
      method: "Debit Card"
    },
    {
      id: 13,
      type: "deposit",
      amount: 500,
      description: "Salary credit",
      date: "2024-10-27",
      time: "09:00 AM",
      status: "completed",
      reference: "TXN-2024-13",
      method: "Direct Deposit"
    },
    {
      id: 12,
      type: "withdrawal",
      amount: 200,
      description: "ATM withdrawal",
      date: "2024-10-26",
      time: "05:20 PM",
      status: "completed",
      reference: "TXN-2024-12",
      method: "ATM"
    },
    {
      id: 11,
      type: "deposit",
      amount: 1000,
      description: "Initial deposit",
      date: "2024-10-25",
      time: "11:15 AM",
      status: "completed",
      reference: "TXN-2024-11",
      method: "Bank Transfer"
    },
    {
      id: 10,
      type: "withdrawal",
      amount: 75,
      description: "Grocery shopping",
      date: "2024-10-24",
      time: "02:30 PM",
      status: "completed",
      reference: "TXN-2024-10",
      method: "Debit Card"
    },
    {
      id: 9,
      type: "deposit",
      amount: 250,
      description: "Freelance payment",
      date: "2024-10-23",
      time: "08:45 AM",
      status: "completed",
      reference: "TXN-2024-09",
      method: "Bank Transfer"
    },
    {
      id: 8,
      type: "withdrawal",
      amount: 300,
      description: "Rent payment",
      date: "2024-10-22",
      time: "10:00 AM",
      status: "completed",
      reference: "TXN-2024-08",
      method: "Bank Transfer"
    },
    {
      id: 7,
      type: "deposit",
      amount: 180,
      description: "Refund",
      date: "2024-10-21",
      time: "01:20 PM",
      status: "completed",
      reference: "TXN-2024-07",
      method: "Credit Card"
    },
    {
      id: 6,
      type: "withdrawal",
      amount: 50,
      description: "Restaurant",
      date: "2024-10-20",
      time: "07:30 PM",
      status: "completed",
      reference: "TXN-2024-06",
      method: "Debit Card"
    },
    {
      id: 5,
      type: "deposit",
      amount: 2000,
      description: "Bonus payment",
      date: "2024-10-19",
      time: "09:30 AM",
      status: "completed",
      reference: "TXN-2024-05",
      method: "Direct Deposit"
    },
    {
      id: 4,
      type: "withdrawal",
      amount: 120,
      description: "Utility bills",
      date: "2024-10-18",
      time: "11:45 AM",
      status: "completed",
      reference: "TXN-2024-04",
      method: "Bank Transfer"
    },
    {
      id: 3,
      type: "deposit",
      amount: 350,
      description: "Investment return",
      date: "2024-10-17",
      time: "02:15 PM",
      status: "completed",
      reference: "TXN-2024-03",
      method: "Bank Transfer"
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 90,
      description: "Gas station",
      date: "2024-10-16",
      time: "04:50 PM",
      status: "completed",
      reference: "TXN-2024-02",
      method: "Debit Card"
    },
    {
      id: 1,
      type: "deposit",
      amount: 500,
      description: "Gift from family",
      date: "2024-10-15",
      time: "06:00 PM",
      status: "completed",
      reference: "TXN-2024-01",
      method: "Bank Transfer"
    }
  ]

  // Filter transactions
  const filteredTransactions = allTransactions.filter((txn) => {
    const matchesSearch =
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || txn.type === filterType

    let matchesPeriod = true
    if (filterPeriod !== "all") {
      const txnDate = new Date(txn.date)
      const today = new Date()
      const daysDiff = Math.floor((today - txnDate) / (1000 * 60 * 60 * 24))

      if (filterPeriod === "today") matchesPeriod = daysDiff === 0
      else if (filterPeriod === "week") matchesPeriod = daysDiff <= 7
      else if (filterPeriod === "month") matchesPeriod = daysDiff <= 30
    }

    return matchesSearch && matchesType && matchesPeriod
  })

  // Calculate totals
  const totalDeposits = filteredTransactions
    .filter((txn) => txn.type === "deposit")
    .reduce((sum, txn) => sum + txn.amount, 0)

  const totalWithdrawals = filteredTransactions
    .filter((txn) => txn.type === "withdrawal")
    .reduce((sum, txn) => sum + txn.amount, 0)

  const handleExport = () => {
    console.log("Exporting transactions...")
    alert("Transaction history exported successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Deposits */}
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
            <p className="text-3xl font-bold">${totalDeposits.toFixed(2)}</p>
          </div>

          {/* Total Withdrawals */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingDown size={28} />
              </div>
              <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                {
                  filteredTransactions.filter((t) => t.type === "withdrawal")
                    .length
                }{" "}
                transactions
              </span>
            </div>
            <p className="text-sm text-red-100 mb-1">Total Withdrawals</p>
            <p className="text-3xl font-bold">${totalWithdrawals.toFixed(2)}</p>
          </div>

          {/* Net Change */}
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
              {totalDeposits - totalWithdrawals >= 0 ? "+" : ""}$
              {(totalDeposits - totalWithdrawals).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
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
                  placeholder="Search by description or reference..."
                />
              </div>
            </div>

            {/* Filter by Type */}
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

            {/* Filter by Period */}
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

          {/* Export Button */}
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

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <Activity size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg font-semibold mb-2">
                No transactions found
              </p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters or search term
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Date & Time
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Method
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800">
                            {transaction.date}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.time}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.reference}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-lg ${
                              transaction.type === "deposit"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "deposit" ? (
                              <TrendingUp
                                className="text-green-600"
                                size={18}
                              />
                            ) : (
                              <TrendingDown
                                className="text-red-600"
                                size={18}
                              />
                            )}
                          </div>
                          <span
                            className={`text-sm font-semibold ${
                              transaction.type === "deposit"
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {transaction.type === "deposit"
                              ? "Deposit"
                              : "Withdrawal"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {transaction.method}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.type === "deposit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Transaction Details
                </h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center py-6">
                  <div
                    className={`p-6 rounded-full ${
                      selectedTransaction.type === "deposit"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {selectedTransaction.type === "deposit" ? (
                      <TrendingUp className="text-green-600" size={48} />
                    ) : (
                      <TrendingDown className="text-red-600" size={48} />
                    )}
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p
                    className={`text-4xl font-bold ${
                      selectedTransaction.type === "deposit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.type === "deposit" ? "+" : "-"}$
                    {selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Reference</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {selectedTransaction.reference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Description</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {selectedTransaction.description}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Date</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {selectedTransaction.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Time</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {selectedTransaction.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Method</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {selectedTransaction.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Status</span>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory
