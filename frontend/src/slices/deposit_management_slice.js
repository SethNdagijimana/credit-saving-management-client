import { createSlice } from "@reduxjs/toolkit"
import { depositAction } from "../actions/deposit-action/deposit-action"

const checkAuth = () => {
  const accessToken = localStorage.getItem("accessToken")
  const user = localStorage.getItem("user")
  return !!(accessToken && user)
}

const getStoredTokens = () => ({
  access: localStorage.getItem("accessToken"),
  refresh: localStorage.getItem("refreshToken") || null
})

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Error parsing stored user:", error)
    return null
  }
}

const initialState = {
  tokens: getStoredTokens(),
  user: getStoredUser(),
  isAuthenticated: checkAuth(),
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
