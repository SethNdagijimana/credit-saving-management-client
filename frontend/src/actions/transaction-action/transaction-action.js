import { createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "../../helper/http"

const getTransactionsAction = createAsyncThunk(
  "transaction/getTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall.get("/savings/transactions")
      return response.data
    } catch (error) {
      console.error("Get transactions failed:", error)
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      )
    }
  }
)

export default getTransactionsAction
