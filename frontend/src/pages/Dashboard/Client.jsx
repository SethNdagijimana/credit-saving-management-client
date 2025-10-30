import { Gauge, ShieldCheck, Users } from "lucide-react"
import { Route, Routes } from "react-router-dom"
import AppNavBar from "../../components/AppNavBar"
import ClientDashboard from "../../components/ClientDashboard/ClientDashboard"
import Deposit from "../../components/Deposit/Deposit"
import Withdraw from "../../components/Withdraw/Withdraw"
import DashboardLayout from "./DashboardLayout"

const menuItems = [
  {
    name: "Dashboard",
    icon: <Gauge size={14} />,
    path: "/dashboard"
  },
  {
    name: "Deposit",
    icon: <ShieldCheck size={14} />,
    path: "/dashboard/deposit"
  },
  {
    name: "Withdraw",
    icon: <Users size={14} />,
    path: "/dashboard/withdraw"
  },
  {
    name: "Transaction",
    icon: <Users size={14} />,
    path: "/dashboard/transaction-history"
  }
]

const Client = () => {
  return (
    <>
      <DashboardLayout
        menuItems={menuItems}
        title="Admin"
        variant="admin"
        breakpoint="lg"
        initialSidebarState={true}
      >
        {{
          nav: <AppNavBar />,
          content: (
            <Routes>
              <Route path="/" element={<ClientDashboard />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route
                path="/transaction-history"
                element={<div>transaction history</div>}
              />
            </Routes>
          )
        }}
      </DashboardLayout>
    </>
  )
}

export default Client
