import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../actions/login-action/login-action"

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
  error: false
}

const userManagementSlice = createSlice({
  name: "userMngmt",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const accessToken = localStorage.getItem("accessToken")
      const user = localStorage.getItem("user")

      if (accessToken && user) {
        try {
          const refreshToken = localStorage.getItem("refreshToken")
          state.tokens = refreshToken
            ? { access: accessToken, refresh: refreshToken }
            : { access: accessToken, refresh: null }
          state.user = JSON.parse(user)
          state.isAuthenticated = true
        } catch (error) {
          console.error("Error parsing user from localStorage:", error)
          state.tokens = { access: null, refresh: null }
          state.user = null
          state.isAuthenticated = false
        }
      } else {
        state.tokens = { access: null, refresh: null }
        state.user = null
        state.isAuthenticated = false
      }
    },

    initializeSystemUser: (state) => {
      return {
        ...initialState,
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      }
    },

    logout: (state) => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      return {
        ...initialState,
        isAuthenticated: false,
        user: null,
        tokens: { access: null, refresh: null }
      }
    },

    clearError: (state) => {
      state.error = false
      state.message = ""
      state.errorCode = ""
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.message = "Registration successful"
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload || "Registration failed"
      })

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false

        const { user, accessToken, refreshToken, deviceId } = action.payload

        if (accessToken) localStorage.setItem("accessToken", accessToken)
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken)
        if (deviceId) localStorage.setItem("deviceId", deviceId)
        localStorage.setItem("user", JSON.stringify(user))

        state.tokens = { access: accessToken, refresh: refreshToken || null }
        state.user = user
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        state.message = action.payload || "Login failed"
      })
  }
})

export const { initializeSystemUser, logout, initializeAuth, clearError } =
  userManagementSlice.actions
export default userManagementSlice.reducer
