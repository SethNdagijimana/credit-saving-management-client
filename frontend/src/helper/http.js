import axios from "axios"
const url = process.env.REACT_APP_BASE_URL

let isRefreshing = false
let failedQueue = []
let store = null

export const setStore = (storeInstance) => {
  store = storeInstance
}

const processQueue = (error, tokens = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(tokens)
    }
  })
  failedQueue = []
}

const apiCall = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
})

apiCall.interceptors.request.use(
  async (config) => {
    let accessToken = null
    let deviceId = localStorage.getItem("deviceId")

    if (store) {
      try {
        const state = store.getState()
        accessToken = state.app?.userMngmt?.tokens?.access
      } catch (error) {
        console.warn("Could not get token from Redux state:", error)
      }
    }

    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken")
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (deviceId) {
      config.headers["x-device-id"] = deviceId
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default apiCall
