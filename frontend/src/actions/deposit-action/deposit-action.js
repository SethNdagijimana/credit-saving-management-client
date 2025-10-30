import { createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "../../helper/http"

export const depositAction = createAsyncThunk(
  "deposit/depositAction",
  async (payload, { rejectWithValue }) => {
    try {
      // 🔑 Get token & device_id from localStorage
      const token = localStorage.getItem("accessToken")
      const deviceId = localStorage.getItem("deviceId")

      if (!token || !deviceId) {
        return rejectWithValue("Missing authentication or device ID")
      }

      // 🧾 Send deposit with headers
      const response = await apiCall.post("/savings/deposit", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-device-id": deviceId
        }
      })

      return response.data
    } catch (error) {
      console.error("Deposit failed:", error)

      // Handle expired / invalid token gracefully
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        return rejectWithValue("Unauthorized or invalid token")
      }

      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while processing your deposit"
      )
    }
  }
)
