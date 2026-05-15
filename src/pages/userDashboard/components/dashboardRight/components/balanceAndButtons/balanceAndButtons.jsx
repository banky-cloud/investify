import { FaPlus } from "react-icons/fa";
import "./balanceAndButtons.css"
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md"
import   {BsThreeDots} from "react-icons/bs"
import { useState } from "react";
import { BiMoneyWithdraw, BiSolidDashboard } from "react-icons/bi"
import { AiOutlineLogout, AiOutlineTransaction } from "react-icons/ai"
import { GrTransaction } from "react-icons/gr"
import { useNavigate } from "react-router-dom"
import { RiLuggageDepositLine } from "react-icons/ri"
import { PiSwap } from "react-icons/pi"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../state/slices/userSlice";



const BalanceAndButtons = () => {
  const navigate=useNavigate();
  const [menuOpen,setMenuOpen]= useState(false)
  const userData= useSelector(selectUser)
  const balance=userData.balance
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
    <div className="balance-and-buttons-con">
      <div className="balance-con">
        <div className="balance-subCon">

        <p>Available Balance:</p>

        <div className="balance">{balance||0}

          <MdArrowOutward color="rgb(220, 253, 101)"/>

        </div>
        
        </div>

      </div>

      <div className="dashboard-btns-con">
        <button onClick={()=>{navigate("/deposit")}} className="dashboard-btn"><FaPlus/> Deposit</button>
        <button className="dashboard-btn"><MdOutlineSwapVert/> Trade</button>
        <button className="dashboard-btn"><BiMoneyWithdraw/> Withdraw</button>
        <button className="dashboard-btn"><BsThreeDots/></button>
      </div>

      <div  onClick={()=>{setMenuOpen(!menuOpen)}} className="dashboard-ham">
        <div className={`dashboard-ham-line ${menuOpen&& "dashboard-ham-line-top"}`}></div>
        <div className={`dashboard-ham-line ${menuOpen&& "dashboard-ham-line-bottom"}`}></div>
      </div>
      <div className={`dashboard-responsive-nav ${menuOpen&& "open-dashboard-responsive-nav"}`}>
        <div className="logo-con">Investify</div>
          <h6  style={{color:"black"}}className="dashboard-nav-title">Dashboard Links</h6>
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
            <h6 className="dashboard-nav-title sec-links text-dark">Actions</h6>

            <div className="dashboard-actions">
            {
              actions.map(a=>{
                const {text,action,Icon}=a;
                return(
                  <div style={{color:"black"}} className="dashboard-nav-action" onClick={action}>
                    <Icon/>
                    <p>{text}</p>
                  </div>
                )
              })
            }

            </div>
      </div>
    
    </div>
  )
}

export default BalanceAndButtons