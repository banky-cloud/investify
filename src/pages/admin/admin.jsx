import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import UsersTable from "./components/userstable";
import TransactionsTable from "./components/transactiontable";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteData, setSiteData } from "../../state/slices/siteSlice";
import { apiEntry } from "../register/register";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate=useNavigate()
    const siteData=useSelector(selectSiteData)
    console.log(siteData);
    const dispatch=useDispatch()

     useEffect(()=>{
    const token=localStorage.getItem("investify_token")
    fetch(`${apiEntry}/users/getAllStats`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token
      }
    })
    .then(res=>res.json())
    .then(data=>{

      if(data.success){
        dispatch(setSiteData(data.result))
      }
      else{
        alert(data.result);
        navigate("/login")

      }
    })
    .catch(err=>{
      alert(err.message)
    })

  },[])

  return (
    <div className="d-flex">
      <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />

      <div className="flex-grow-1">
        <Topbar onToggle={() => setShowSidebar(true)} />

        <Container fluid className="mt-4">
          <UsersTable users={siteData.allUsers} />
          <TransactionsTable transactions={siteData.allTransactions} />
        </Container>
      </div>
    </div>
  );
}