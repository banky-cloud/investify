import "./login.css"
import {Link} from "react-router-dom";
import { IoIosFastforward } from "react-icons/io";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import ErrorModal from "../../components/errormodal"
import Loader from "../../components/spinner";
import { RxHamburgerMenu } from "react-icons/rx";
export const apiEntry= "http://localhost:3333"
import { IoClose } from "react-icons/io5";
const Login = () => {
    const navigate=useNavigate()
    
    const [country,setCountry]=useState({})
    const [loading,setLoading]=useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [firstSlide,setFirstSlide]= useState(true)

    const MenuBtn=  menuOpen?IoClose:RxHamburgerMenu
    console.log(firstSlide)
    const [errors,setErrors]=useState([])
    console.log(errors)
    console.log(country)
    const handleCountryChange=(country)=>{
        setCountry(country)
    }
    const submitForm=(e)=>{
        e.preventDefault()
        const tempErrors=[]
          const explanations=   {
    firstName: "First name was left blank",
    lastName: "Last name is required",
    email: "Email is required",
    phone: "Phone number is required",
    password: "password is required",
    
}
        setErrors([])
        const form= e.target
        const entries= Object.fromEntries( new FormData(form))
        console.log({entries})
        Object.keys(entries).forEach(field=>{
            if(!entries[field]){
                tempErrors.push(explanations[field])
            }
        })
       
    
        
      
        
        
        
        if(tempErrors.length===0){
            setLoading(true)
            fetch(`${apiEntry}/users/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(entries)
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.success){
                localStorage.setItem("investify_token", data.result)
                navigate("/")
            }
            else{
                alert(data.result)
                setLoading(false)
            }
        })
        .catch(err=>{
            console.log(err.message);
            alert(err.message)
            setLoading(false);
        })
        
        
        
        
    }
    
    else{
        
        setErrors(tempErrors);
        
    }
    
    
    setErrors(tempErrors)
    

    }
  return (
    <>
    <div className="register-con">
    <div onClick={()=>{setMenuOpen(!menuOpen)}} className="register-ham">
        <MenuBtn size={38} />
    </div>
    <div className={`register-nav-menu ${menuOpen&&"active-register-nav-menu"}`}>
        <Link to="/home">Home</Link>
        <Link to="/register">Register</Link>
    </div>
    {(errors.length>0)&&<ErrorModal setErrors={setErrors} errors={errors}/>}
        <div className="register-subcon">
            <div className="register-left">
                <p className="register-logo">Investify</p>

                <div className="register-text">
                    Sign In
                </div>
                <div className="register-links">
                    <Link to="/login" className="register-link underlined">Login</Link>
                    <Link to="/register" className="register-link">Register</Link>
                    <div className="rline"></div>
                </div>

            </div>
            <div className="register-right">
        <div className="register-title">Login</div>
        <div className="register-inputs">
            <form  onSubmit={submitForm} className="register-form">
                <div className={`inputs-group ${firstSlide&&'active-input-group'}`}>
                  
            <input type="email" placeholder="Email" name="email"  className="register-input" />
            <input type="password" placeholder="Input Your Password" name="password"  className="register-input" />
                <Link style={{float:"right", fontSize:"13px",textDecoration:"none"}} to="/forgot-password">Forgot Password?</Link>
                    <button disabled={loading} className="register-next-button signup-btn"><p>Sign In </p>{loading&&<Loader style={{marginLeft:"10px", display:"inline-block"}}/>}</button>

                </div>
              

            </form>
         
        

        </div>
            </div>
        </div>
    </div>
    
    
    </>
  )
}

export default Login