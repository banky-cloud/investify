import "./App.css"
import Header from "../components/header/header"
import Hero from "../components/hero/hero"
import About from "../components/about/about"
import Testimonials from "../components/testimonials/testimonials"
import Pricing from "../components/pricing/pricing";
import Footer from "../components/footer/footer"
import { useState } from "react"


export default function Home(){
  const [plan,setPlan]= useState("")
  return(
    <>
    <Header/>
    
    <Hero/>
    <About/>
    <Pricing plan={plan} setPlan={setPlan}/>
    <Testimonials/>
    <Footer/>
    
    </>
  )
}