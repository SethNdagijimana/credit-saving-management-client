import { createSlice } from "@reduxjs/toolkit"
import { depositAction } from "../actions/deposit-action/deposit-action"

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: ""
}

const depositManagementSlice = createSlice({
  name: "depositMngmt",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false
      state.success = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(depositAction.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = false
        state.message = ""
      })
      .addCase(depositAction.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.message =
          action.payload?.message || "Deposit completed successfully"

        const updatedUser = JSON.parse(localStorage.getItem("user") || "{}")
        if (updatedUser && action.payload?.account?.balance !== undefined) {
          updatedUser.balance = action.payload.account.balance
          localStorage.setItem("user", JSON.stringify(updatedUser))
        }
      })
      .addCase(depositAction.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = action.payload || "Deposit failed"
      })
  }
})

export const { clearError } = depositManagementSlice.actions
export default depositManagementSlice.reducer
