import "./header.css"
import logo from "../../assets/logo.png"
import { useState } from "react"
import {Link} from "react-router-dom"
const linksData=[
    {text:"Home",path:"#home"},
    {text:"About Us",path:"#about"},
    {text:"Pricing",path:"#pricing"},
    {text:"License",path:"#License"},

]

const Header = () => {

    const [menuOpen,setMenuOpen]=useState(false)


  return (
    <>
    <div className="header">
        <div className="logo-con">
        Investify
        </div>

        <ul className="links">
            {linksData.map(link=>{
                    return(
                        <a className="link-item" href={link.path}>
                            {link.text}
                        </a>
                    )
            })}
        </ul>
        <div className="buttons">
            <Link  to="/register">
            <button  className="colored-btn" to="/register">
                Register
                </button>
            </Link>

             <Link  to="/login">
            <button  className="plain-btn" to="/register">
                Login
                </button>
            </Link>
           
            

        </div>
        <div className="ham" onClick={()=>{setMenuOpen(!menuOpen)}}>
            <div className={`line ${menuOpen&&"tilted-top"}`}></div>
            <div className={`line ${menuOpen&&"tilted-bottom"}`}></div>
        </div>
    </div>
    <div className={`responsive-nav ${menuOpen&&"open"}`}>
            {linksData.map(link=>{
                    return(
                        <a className="link-item bl" href={link.path}>
                            {link.text}
                        </a>
                    )
            })}


             <div className="nav-buttons">
            <Link  to="/register">
            <button  className="colored-btn" to="/register">
                Register
                </button>
            </Link>

             <Link  to="/login">
            <button style={{backgroundColor:"white"}}  className="plain-btn" to="/register">
                Login
                </button>
            </Link>
           
            

        </div>
    </div>
    </>
  )
}

export default Header