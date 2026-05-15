import "./about.css"
import { useEffect, useState } from "react"
import compare from "../../assets/compare.png"
import estimate from "../../assets/estimate.png"
import financial from "../../assets/financial.png"
import historical from "../../assets/historical.png"
import overview from "../../assets/overview.png"
import valuation from "../../assets/valuation.png"
const aboutTitle=`Our Philosophy`
const aboutText=`At Investify, we believe that successful investing is built on discipline, insight, and long-term vision. Our mission is to provide individuals and organizations with a reliable platform where capital can be managed with precision, transparency, and confidence.

Investify combines advanced technology with a structured investment approach to simplify complex financial decisions. Through intuitive tools and carefully designed systems, we enable our users to track performance, explore opportunities, and make informed investment choices in a secure environment.

Our philosophy centers on responsible growth and strategic thinking. Rather than chasing short-term trends, we focus on stability, informed decision-making, and sustainable value creation. Every feature within our platform is designed to support clarity, control, and long-term financial success.

At its core, Investify exists to empower investors with the resources, structure, and confidence needed to navigate modern financial markets and build wealth with purpose.`

const slidesData=[
{text:"compare",image:compare},
{text:"estimate",image:estimate},
{text:"financial",image:financial},
{text:"historical",image:historical},
{text:"overview",image:overview},
{text:"valuation",image:valuation},
]
const About = () => { 

  const [slideIndex,setSlideIndex]=useState(0);
  useEffect(()=>{

   const interval= setInterval(() => {
      setSlideIndex(()=>{
        if(slideIndex<(slidesData.length-1)){
          return slideIndex+1
        }
        else{
          return 0;
        }
      })
    }, 5000);
    return ()=>{
      clearInterval(interval)
    }
  })
  const currentSlide=slidesData[slideIndex]
  return (
    <div id="about">
        <div className="about-text-con">
          <h3 className="about-title">{aboutTitle}</h3>
          <div className="about-text">{aboutText}</div>
        </div>
        <div className="carousel-con">
          <div className="carousel-title">{currentSlide.text}</div>
         
          <div className="carousel">

          {
            slidesData.map((slide,index)=>{
              return(
                
                <img src={slide.image} alt={currentSlide.text} className={`carousel-img ${(index===slideIndex)&&'active-carousel'}`} />
              )
            })
          }
          </div>
           <div className="dots">
            {slidesData.map((slide,index)=>{
              return(
            <div className={`dot ${(index===slideIndex)&&"active-dot"}`}></div>

              )
            })}
          </div>
        </div>
    </div>
  )
}

export default About