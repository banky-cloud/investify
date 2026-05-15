import BalanceAndButtons from "./components/balanceAndButtons/balanceAndButtons"
import Cashflow from "./components/cashflow/cashflow"
import "./dashboardRight.css"



const DashboardRight = () => {
  return (
    <div className="dashboard-right">
      <BalanceAndButtons/>
      <Cashflow/>
    </div>
  )
}

export default DashboardRight