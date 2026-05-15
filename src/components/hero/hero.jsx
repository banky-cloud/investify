import "./hero.css"
import heroVid from "../../assets/hero-video.mp4"
const heroText=`Welcome to Investify — an exclusive resource management platform crafted for those who demand more from their financial journey. Experience precision, discretion, and intelligent tools designed to grow and preserve your legacy.`
const heroTitle=`Where Wealth Meets Vision.`
import { IoArrowForwardCircleOutline } from "react-icons/io5";
const Hero = () => {
  return (
    <div className="hero" id="home">
        <video autoPlay muted loop src={heroVid} className="vid">

        </video>
        <div className="shade"></div>
        <div className="hero-content">
        <div className="content-con">

          <h3 className="hero-title">
            {heroTitle}
          </h3>

          <p className="hero-text">
            {heroText}
          </p>
          <a style={{textDecoration:"none"}} href="/register">
          <button className="hero-btn">Get Started <IoArrowForwardCircleOutline style={{marginLeft:'5px', fontSize:'20px'}}/></button>
          </a>
        </div>
        </div>

    </div>
  )
}

export default Hero