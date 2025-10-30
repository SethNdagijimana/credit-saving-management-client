import {
  Calendar,
  CreditCard,
  FileText,
  Smartphone,
  TrendingDown,
  TrendingUp,
  X
} from "lucide-react"

const TransactionModal = ({ transaction, onClose }) => {
  if (!transaction) return null

  const isDeposit = transaction.type === "deposit"

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`relative px-6 py-8 rounded-t-2xl ${
            isDeposit
              ? "bg-gradient-to-br from-green-500 to-green-600"
              : "bg-gradient-to-br from-red-500 to-red-600"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-xl">
              {isDeposit ? (
                <TrendingUp size={32} className="text-white" />
              ) : (
                <TrendingDown size={32} className="text-white" />
              )}
            </div>
            <div className="text-white">
              <p className="text-sm opacity-90 uppercase tracking-wide font-semibold">
                {isDeposit ? "Deposit" : "Withdrawal"}
              </p>
              <p className="text-3xl font-bold mt-1">
                {isDeposit ? "+" : "-"}RWF {transaction.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          {/* Description */}
          {transaction.description && (
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-gray-800 font-medium break-words">
                  {transaction.description}
                </p>
              </div>
            </div>
          )}

          {/* Account Number */}
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
            <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
              <CreditCard size={20} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Account Number
              </p>
              <p className="text-gray-800 font-medium font-mono break-all">
                {transaction.accountNumber || "N/A"}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
            <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
              <Calendar size={20} className="text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Transaction Date
              </p>
              <p className="text-gray-800 font-medium">
                {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(transaction.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>

          {/* Device ID */}
          {transaction.deviceId && (
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                <Smartphone size={20} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Device ID
                </p>
                <p className="text-gray-800 font-medium font-mono text-sm break-all">
                  {transaction.deviceId}
                </p>
              </div>
            </div>
          )}

          {/* Transaction ID */}
          {transaction.id && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
              <p className="text-xs text-gray-600 font-mono break-all">
                {transaction.id}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Close
          </button>
          <button className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
