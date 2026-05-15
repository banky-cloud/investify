import { useEffect, useState } from "react"
import DashboardRight from "./components/dashboardRight/dashboardRight"
import DashboardNav from "./components/nav/nav"
import "./userDashboard.css"
import { useNavigate } from "react-router-dom"
import {apiEntry} from "../../pages/register/register"
import { useDispatch } from "react-redux"
import { selectUser, setUser } from "../../state/slices/userSlice"
import LoadingPage from "../loading/loading"




const UserDashboard = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const [loading,setLoading]=useState(false)
  
  useEffect(()=>{
    const token=localStorage.getItem("investify_token")
    setLoading(true)
    fetch(`${apiEntry}/users/token`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success){
        const {result}=data;
        dispatch(setUser(data.result));
        setLoading(false);
        console.log(data.result)
        if(data.result.isAdmin){
          navigate("/admin")
        }
        
      }
      else{
        alert("session expired, please log in again");
        navigate("/login")
      }
    }).catch(err=>{
      alert("session expired, please log in again");
        navigate("/login")
    })
    
  },[])
  return (<>
  {loading?<LoadingPage inDashboard={true}/>:(<div className="dashboard-container">
        <DashboardNav/>
        <DashboardRight/>

    </div>)}
    
  </>
  )
}

export default UserDashboard