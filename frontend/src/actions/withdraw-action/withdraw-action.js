import { createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "../../helper/http"

export const withdrawAction = createAsyncThunk(
  "withdraw/withdrawAction",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiCall.post("/savings/withdraw", payload)

      return response.data
    } catch (error) {
      console.error("Withdraw failed:", error)

      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while processing the withdrawal"
      )
    }
  }
)

export default withdrawAction
