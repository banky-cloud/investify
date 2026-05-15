import DashedLineChart from "../chart"
import "./cashflow.css"
import { FaArrowUpLong , FaArrowDownLong} from "react-icons/fa6"
import { FiArrowDownLeft,FiArrowUpRight } from "react-icons/fi"
import { useSelector } from "react-redux";
import {selectUser}   from "../../../../../../state/slices/userSlice"
import Table from "../table"
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
export const domain= "http://localhost:5173"
const Cashflow = () => {
  const  userData= useSelector(selectUser);
  
  const transactions= userData.transactions;
  const deposit_transactions=transactions.filter(x=>((x.transaction_type==="deposit")&&x.status==="approved"))
  const incomeList=[...deposit_transactions]
  const investment_transactions=transactions.filter(x=>((x.transaction_type==="investment")&&x.status==="approved"))
  console.log({investment_transactions})
  const expenditureList= [...investment_transactions]
  
const totalreferral_bonus= transactions.filter(x=>x.transaction_type==="referral_bonus").reduce((a,b)=>a+b.amount,0)
  const totalIncome= incomeList.reduce((a,b)=>{

    return a+b.amount},0)
    const totalExpenditure= expenditureList.reduce((a,b)=>a+b.amount,0)
  const referral_code= userData.referral_code
  const referral_link=`${domain}/register?r=${referral_code}`
  const handleCopy=()=>{
    if(referral_code){
      navigator.clipboard.writeText(referral_link).then(toast.success("Copied")).catch(err=>{
      toast.error(err.message)
    })
    }
    else{
      toast.error("Still loading ...")
    }
    
  }
  
  const headings=[
    "Date","Transaction-Type" ,"For", "Status"]
  return (
    <div className="cashflow">
      <div className="cashflow-top">

        <button className="cashflow-btn">Cash flow
            <span className="btn-arrows"><FaArrowUpLong color="rgb(7, 143, 7)"/><FaArrowDownLong color="rgb(238, 7, 7)"/></span>
        </button>

       

        </div>
        <div className="cashflow-chart-andStats">
          <DashedLineChart/>
          <div className="stats">
            <div className="tracker-stat-card">

              <div className="stat-marker bg-success text-light">
                <FiArrowDownLeft/>
              </div>
              <div className="stat-text">

              <p className="stat-card-title">Income</p>
              <div className="stat-amount">{totalIncome+totalreferral_bonus}</div>
              
              </div>
            </div>
            <div className="tracker-stat-card">
              <div className="stat-marker bg-danger text-light">
                <FiArrowUpRight/>
              </div>
              <div className="stat-text">

              <p className="stat-card-title">Expenditure</p>
              <div className="stat-amount">{totalExpenditure}</div>
              </div>

            </div>
          </div>
        </div>
        <div className="cashflow-inline-stats">
          <div className="tracker-stat-card">
            <div className="stat-text">
              
            <div className="stat-title">Total Investments</div>
              <div className="stat-amount">0</div>
            </div>


          </div>
                      
          <div className="tracker-stat-card">
             <div className="stat-text">
              
            <div className="stat-title">Total Withdrawals</div>
              <div className="stat-amount">0</div>
            </div>
          </div>
          <div className="tracker-stat-card">
             <div className="stat-text">
              
            <div className="stat-title">Referral Bonus</div>
              <div className="stat-amount">{totalreferral_bonus}</div>

              <Button onClick={handleCopy} style={{opacity:0.5}} variant="dark">Click to copy referral link</Button>
            </div>
          </div>
         <Table headings={headings} data={transactions}/>
        </div>
      </div>
  )
}

export default Cashflow