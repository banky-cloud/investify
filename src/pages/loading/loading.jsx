import { PuffLoader } from "react-spinners"
import "./loading.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiEntry } from "../register/register"
import toast from "react-hot-toast"


export default function LoadingPage({inDashboard}){
    const navigate=useNavigate()
    useEffect(()=>{

        fetch(apiEntry).then(res=>res.json()).then(data=>{}).catch(err=>{toast.error(err.message)})
        const token= localStorage.getItem("investify_token");

        if(!token){
            navigate("/home")
        }
        else{
            if(!inDashboard){
                navigate("/dashboard")
            }
        }
    },[])
return(
    <div className="loading-page-con">

        <PuffLoader color="var(--secondary-color)"/>
    </div>
)

}