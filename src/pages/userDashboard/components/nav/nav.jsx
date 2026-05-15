import { BiMoneyWithdraw, BiSolidDashboard } from "react-icons/bi"
import "./nav.css"
import { AiOutlineLogout, AiOutlineTransaction } from "react-icons/ai"
import { GrTransaction } from "react-icons/gr"
import { useNavigate } from "react-router-dom"
import { RiLuggageDepositLine } from "react-icons/ri"
import { PiSwap } from "react-icons/pi"
import { FaRegMoneyBillAlt } from "react-icons/fa"


const DashboardNav = () => {

  const navigate=useNavigate()
  const actions=[
    {text:"Fund account", action:()=>{navigate("/deposit")},Icon:RiLuggageDepositLine},
    {text:"Trade", action:()=>{navigate("/invest")}, Icon:PiSwap},
    {text:"Withdraw", action:()=>{navigate("/withdraw")}, Icon:BiMoneyWithdraw},
    {text:"Earn", action:()=>{navigate("/earn")}, Icon:FaRegMoneyBillAlt},
    {text:"Logout", action:()=>{
      const canProceed= window.confirm("Are you sure you want to log out?");
      if(canProceed){
        localStorage.removeItem("investify_token")
      navigate("/")
      }
    
    }, Icon:AiOutlineLogout},
  ]

const dashboardLinks=[
    {path:"/dashboard", text:"Dashboard",Icon:BiSolidDashboard},
    {path:"/dashboard/#transactions", text:"Transactions",Icon:AiOutlineTransaction},
    {path:"/dashboard/#payments", text:"Payments",Icon:GrTransaction},
    
]

  return (
    <div className="dashboard-nav">

        <div className="logo-con">Investify</div>
          <h6 className="dashboard-nav-title">Dashboard Links</h6>
        <div className="dashboard-links">
          {dashboardLinks.map(link=>{
            const {path,Icon,text}=link
            return(
              <a href={path} className="dashboard-link">
                <p className="dashboard-link-text">{text}</p>
                <Icon/>
              </a>
            )
          })}

        </div>
            <h6 className="dashboard-nav-title sec-links">Actions</h6>

            <div className="dashboard-actions">
            {
              actions.map(a=>{
                const {text,action,Icon}=a
                return(
                  <div className="dashboard-nav-action" onClick={action}>
                    <Icon/>
                    <p>{text}</p>
                  </div>
                )
              })
            }

            </div>
    </div>
  )
}

export default DashboardNav