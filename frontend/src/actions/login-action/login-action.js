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
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid credentials. Please try again."
      return rejectWithValue(message)
    }
  }
)
