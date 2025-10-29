import { transactionDTO } from "../dtos/transactionDTO.js"
import {
  depositService,
  getTransactionsService,
  withdrawService
} from "../services/savingsService.js"

export const deposit = async (req, res) => {
  try {
    const { amount, description } = req.body
    const user = req.user

    const { oldBalance, newBalance, transaction, account } =
      await depositService(user.id, amount, description, user.deviceId)

    res.json({
      message: "Deposit successful",
      transaction: transactionDTO({
        ...transaction,
        userName: user.name,
        oldBalance,
        newBalance,
        accountNumber: account.account_number
      }),
      account
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const withdraw = async (req, res) => {
  try {
    const { amount, description } = req.body
    const user = req.user

    const { oldBalance, newBalance, transaction, account } =
      await withdrawService(user.id, amount, description, user.deviceId)

    res.json({
      message: "Withdrawal successful",
      transaction: transactionDTO({
        ...transaction,
        userName: user.name,
        oldBalance,
        newBalance,
        accountNumber: account.account_number
      }),
      account
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const getMyTransactions = async (req, res) => {
  try {
    const userId = req.user.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const { transactions, pagination } = await getTransactionsService(
      userId,
      page,
      limit
    )

    res.json({
      pagination,
      transactions: transactions.map(transactionDTO)
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
