import "./register.css"
import {Link, useLoaderData, useLocation, useParams} from "react-router-dom";
import { IoIosFastforward } from "react-icons/io";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import ErrorModal from "../../components/errormodal"
import Loader from "../../components/spinner";
import { RxHamburgerMenu } from "react-icons/rx";
export const apiEntry= "https://investify-server.onrender.com"
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
const register = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const ref=location.search.split("=")[1]
    
    
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
    rePassword: "Password must be  provided and must match"
}
        setErrors([])
        const form= e.target
        const entries= Object.fromEntries( new FormData(form))
        Object.keys(entries).forEach(field=>{
            if(!entries[field]){
                tempErrors.push(explanations[field])
            }
        })
        if(!country.phone_code){
            tempErrors.push("Please Select your country")
        }
    
        
        if(!(entries.password==entries.rePassword)){
        
            tempErrors.push(`Passwords don't match` );
            
        };
        
        
        
        if(tempErrors.length===0){
            setLoading(true)
            
            fetch(`${apiEntry}/users/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...entries, country, ref:String(ref)})
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                localStorage.setItem("investify_token", data.result)
                navigate("/")
            }
            else{
                
                if(data.result.includes("duplicate")){
                        toast.error("Email or phone  is already associated  with another account");
                        setLoading(false)
                }
            }
        })
        .catch(err=>{
            console.log(err.message)
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
        <Link to="/login">Login</Link>
    </div>
    {(errors.length>0)&&<ErrorModal setErrors={setErrors} errors={errors}/>}
        <div className="register-subcon">
            <div className="register-left">
                <p className="register-logo">Investify</p>

                <div className="register-text">
                    New User Registration.
                </div>
                <div className="register-links">
                    <Link to="/login" className="register-link">Login</Link>
                    <Link to="/register" className="register-link underlined">Register</Link>
                    <div className="rline"></div>
                </div>

            </div>
            <div className="register-right">
        <div className="register-title">Sign up</div>
        <div className="register-inputs">
            <form  onSubmit={submitForm} className="register-form">
                <div className={`inputs-group ${firstSlide&&'active-input-group'}`}>
                       <div className="register-input-flex">
                <input type="text" name="firstName" className="register-input" placeholder="First Name" />
                <input type="text" placeholder="Last Name" name="lastName" className="register-input" />
            </div>
            <input id="emailInp" type="email" placeholder="Email" name="email"  className="register-input" />
            <div className="register-input-flex">
                <CountrySelect onChange={handleCountryChange} placeHolder="Select Country" style={{zIndex:5 ,color:"black"}} inputClassName="register-input borderless" containerClassName="register-input"/>
                <div className="phoneInput">
                    <label htmlFor="phone"> (+{country.phone_code})</label>
            
                <input id="phone" type="number" className="register-input borderless" name="phone" placeholder="Phone" />
                </div>
            </div>
            <div onClick={()=>{setFirstSlide(false)}} className="reg-nx-bton"><IoIosFastforward/></div>
    
                </div>
                <div className={`inputs-group ${!firstSlide&&'active-input-group'}`}>
                    <div className="register-input-flex">
                    <input className="register-input" name="password" type="password" placeholder="Password"/>
                    <input className="register-input" name="rePassword" type="password" placeholder="Retype password"/>

                    </div>
                    <div className="reg-btns-flex">
                    <button disabled={loading} className="register-next-button signup-btn"><p>Sign Up </p>{loading&&<Loader style={{marginLeft:"10px", display:"inline-block"}}/>}</button>
                    <div onClick={()=>{setFirstSlide(true)}} className="register-next-button ">
                        <GrFormPreviousLink/>
                    </div>

                    </div>
                </div>

            </form>
         
        

        </div>
            </div>
        </div>
    </div>
    
    
    </>
  )
}

export default register