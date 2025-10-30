import { createSlice } from "@reduxjs/toolkit"
import getTransactionsAction from "../actions/transaction-action/transaction-action"

const initialState = {
  transactions: [],
  pagination: null,
  loading: false,
  success: false,
  error: false,
  message: ""
}

const transactionManagementSlice = createSlice({
  name: "transactionMngmt",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAction.pending, (state) => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(getTransactionsAction.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.transactions = action.payload.transactions || []
        state.pagination = action.payload.pagination || null
      })
      .addCase(getTransactionsAction.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = action.payload || "Failed to fetch transactions"
      })
  }
})

export const { clearError } = transactionManagementSlice.actions
export default transactionManagementSlice.reducer
