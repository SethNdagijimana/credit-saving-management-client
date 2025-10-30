import { createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "../../helper/http"

export const getNotificationsAction = createAsyncThunk(
  "notification/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall.get("/notifications")
      return response.data.notifications || []
    } catch (error) {
      console.error("Get notifications failed:", error)
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications"
      )
    }
  }
)

export const markReadAction = createAsyncThunk(
  "notification/markRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall.patch("/mark-read")

      return response.data
    } catch (error) {
      console.error("Mark read failed:", error)
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark notifications as read"
      )
    }
  }
)
