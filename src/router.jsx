import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import Register from "./pages/register/register"
import Login from "./pages/login/login"
import LoadingPage from "./pages/loading/loading";
import UserDashboard from "./pages/userDashboard/userDashboard";
import DepositDashboard from "./pages/deposit/deposit";
import AdminDashboard from "./pages/admin/admin"
import Withdraw from "./pages/withdraw/withdraw";
import InvestmentPage from "./pages/invest/invest";
import ForgotPassword from "./pages/forgot-password/forgotPassword";
import ResetPassword from "./pages/resetpassword/resetPassword";
import NotifyUser from "./pages/notify/notify";
import AdminPlans from "./pages/editPlans/editPlans";
import EditDepositWallets from "./pages/editWallet/editWallet";

const router= createBrowserRouter([
    {path:"/",element:<LoadingPage/>},
    {path:"/home",element:<App/>},
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},
    {path:"/dashboard",element:<UserDashboard/>},
    {path:"/deposit",element:<DepositDashboard/>},
    {path:"/admin",element:<AdminDashboard/>},
    {path:"/withdraw",element:<Withdraw/>},
    {path:"/invest",element:<InvestmentPage/>},
    {path:"/forgot-password",element:<ForgotPassword/>},
    {path:"/resetpassword/:id",element:<ResetPassword/>},
    {path:"/notify/:id",element:<NotifyUser/>},
    {path:"/editPlans",element:<AdminPlans/>},
    {path:"/editWallets",element:<EditDepositWallets/>},
])
export default router