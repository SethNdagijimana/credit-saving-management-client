import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { initializeAuth } from "../slices/user_management_slice"
import Loading from "./Loading"

function ProtectedRoute({ children }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()

  const { isAuthenticated } = useSelector((state) => state.app.userMngmt || {})

  useEffect(() => {
    dispatch(initializeAuth())

    setTimeout(() => setIsInitialized(true), 200)
  }, [dispatch])

  if (!isInitialized) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
