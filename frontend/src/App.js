import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"))
const Login = React.lazy(() => import("./pages/LogIn/Login"))
const Client = React.lazy(() => import("./pages/Dashboard/Client"))

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
      <Route exact path="/dashboard/*" element={<Client />} />
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
