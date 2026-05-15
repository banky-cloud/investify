import "./testimonials.css"
import danielCarter from "../../assets/daniel-carter.png"
import sophiaBannett from "../../assets/sophia-bennett.png"
import MichaelLawson from "../../assets/mike-lawson.png"
import oliviaGrant from "../../assets/olivia-grant.png"
import jamesWhitaker from "../../assets/james-whitaker.png"
import emmaRichardson from "../../assets/emma-richardson.png"
import { FaRegStar, FaStar } from "react-icons/fa"


const testimonialData = [
  {
    name: "Daniel Carter",
    role: "Financial Consultant",
    image: danielCarter,
    rating: 5,
    review:
      "Investify brings a level of clarity to investing that I rarely see in digital platforms. The tools are intuitive and the performance tracking is exceptionally well designed."
  },
  {
    name: "Sophia Bennett",
    role: "Startup Founder",
    image: sophiaBannett,
    rating: 5,
    review:
      "What impressed me most about Investify is the structure of the platform. Everything feels deliberate, secure, and built for serious investors."
  },
  {
    name: "Michael Lawson",
    role: "Private Investor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    rating: 4,
    review:
      "I've used several portfolio platforms over the years, but Investify stands out for its simplicity and analytical depth. It makes managing investments effortless."
  },
  {
    name: "Olivia Grant",
    role: "Business Strategist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    rating: 5,
    review:
      "Investify helped me organize my investments in a way that finally makes sense. The platform delivers both control and transparency."
  },
  {
    name: "James Whitaker",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 5,
    review:
      "The user experience is exceptional. Investify combines powerful financial insights with a clean, professional interface."
  },
  {
    name: "Emma Richardson",
    role: "Asset Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    rating: 5,
    review:
      "Investify provides a structured approach to portfolio management that is both reliable and efficient. It’s a platform I genuinely trust."
  }
 
  
];


const Testimonials = () => {
  
  return (
    <div id="reviews">
        <div className="testimonial-btn">Reviews 😊</div>
        <div className="testimonial-title">
            Our Success Story
        </div>
        <div className="testimonial-con">
          {
            testimonialData.map((testimonial,index)=>{
              const {image,name,review, rating}= testimonial
              const stars= new Array(4).fill(FaStar)
             stars.push(rating===5?FaStar:FaRegStar)

              return(
                <div className={`testimonial-card ${((index===1)||(index===4))&&"skewed"}`}>
                  <img  src={image} alt={name} className="testimonial-img"/>
                  <div className="quote opening">“</div>
                  <div className="quote closing">”</div>
                  <p className="testimonial-name">{name}</p>
                  <p className="testimonial-text">{review}</p>
                  <div className="stars">
                    {stars.map(Star=><Star color="var(--tet-color)"/>)}

                  </div>
                </div>
              )
            })
          }

        </div>

    </div>
  )
}

export default Testimonials