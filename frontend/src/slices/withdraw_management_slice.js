import { createSlice } from "@reduxjs/toolkit"
import withdrawAction from "../actions/withdraw-action/withdraw-action"

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: ""
}

const withdrawManagementSlice = createSlice({
  name: "withdrawMngmt",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false
      state.message = ""
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(withdrawAction.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = false
        state.message = ""
      })
      .addCase(withdrawAction.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.message = action.payload?.message || "Withdrawal successful"

        const updatedUser = JSON.parse(localStorage.getItem("user") || "{}")
        if (updatedUser && action.payload?.account?.balance !== undefined) {
          updatedUser.balance = action.payload.account.balance
          localStorage.setItem("user", JSON.stringify(updatedUser))
        }
      })
      .addCase(withdrawAction.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = action.payload || "Withdrawal failed"
      })
  }
})

export const { clearError } = withdrawManagementSlice.actions
export default withdrawManagementSlice.reducer
