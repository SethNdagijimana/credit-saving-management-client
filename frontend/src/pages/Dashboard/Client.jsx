import {
  ArrowRightLeft,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Gauge
} from "lucide-react"
import { Route, Routes } from "react-router-dom"
import AppNavBar from "../../components/AppNavBar"
import ClientDashboard from "../../components/ClientDashboard/ClientDashboard"
import Deposit from "../../components/Deposit/Deposit"
import TransactionHistory from "../../components/Transaction/TransactionHistory"
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
    icon: <BanknoteArrowUp size={14} />,
    path: "/dashboard/deposit"
  },
  {
    name: "Withdraw",
    icon: <BanknoteArrowDown size={14} />,
    path: "/dashboard/withdraw"
  },
  {
    name: "Transaction",
    icon: <ArrowRightLeft size={14} />,
    path: "/dashboard/transaction-history"
  }
]

const Client = () => {
  return (
    <>
      <DashboardLayout
        menuItems={menuItems}
        title="Client"
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
                element={<TransactionHistory />}
              />
            </Routes>
          )
        }}
      </DashboardLayout>
    </>
  )
}

export default Client
