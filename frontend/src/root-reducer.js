import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import depositManagementReducer from "./slices/deposit_management_slice"
import transactionManagementReducer from "./slices/transaction_management_slice"
import userManagementReducer from "./slices/user_management_slice"
import withdrawManagementReducer from "./slices/withdraw_management_slice"

const rootReducer = combineReducers({
  userMngmt: userManagementReducer,
  depositMngmt: depositManagementReducer,
  withdrawMngmt: withdrawManagementReducer,
  transactionMngmt: transactionManagementReducer
})

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const CreditAppReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root")
    localStorage.removeItem("token")
    state = undefined
  }

  return persistedReducer(state, action)
}

export default CreditAppReducer
