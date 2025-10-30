import { createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "../../helper/http"

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiCall.post("/auth/register", userData)
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again."
      return rejectWithValue(message)
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiCall.post("/auth/login", credentials)
      const data = response.data

      if (data?.token) {
        localStorage.setItem("accessToken", data.token)
      }

      if (data?.deviceId) {
        localStorage.setItem("deviceId", data.deviceId)
      }

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      return {
        user: data.user,
        accessToken: data.token,
        refreshToken: null,
        deviceId: data.deviceId
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid credentials. Please try again."
      return rejectWithValue(message)
    }
  }
)
