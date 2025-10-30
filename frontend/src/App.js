import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Login from "./pages/LogIn/Login"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" name="home" element={<HomePage />} />
      <Route exact path="/login" name="Login" element={<Login />} />
      {/* <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute requiredType={["admin"]}>
            <Client />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
