import { createSlice } from "@reduxjs/toolkit"
import {
  getNotificationsAction,
  markReadAction
} from "../actions/notification-action/notification-action"

const initialState = {
  notifications: [],
  loading: false,
  error: false,
  success: false,
  message: ""
}

const notificationManagementReducer = createSlice({
  name: "notificationMngmt",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false
      state.message = ""
    },
    markAllReadLocal: (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        is_read: true
      }))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsAction.pending, (state) => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(getNotificationsAction.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.notifications = action.payload || []
      })
      .addCase(getNotificationsAction.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = action.payload || "Failed to fetch notifications"
      })

      .addCase(markReadAction.pending, (state) => {
        state.loading = true
        state.error = false
        state.message = ""
      })
      .addCase(markReadAction.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.message =
          action.payload?.message || "Notifications marked as read"

        state.notifications = state.notifications.map((n) => ({
          ...n,
          is_read: true
        }))
      })
      .addCase(markReadAction.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = action.payload || "Failed to mark notifications as read"
      })
  }
})

export const { clearError, markAllReadLocal } =
  notificationManagementReducer.actions
export default notificationManagementReducer.reducer
