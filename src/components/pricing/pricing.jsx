import { useEffect, useState } from "react";
import "./pricing.css";
import { useNavigate } from "react-router-dom";
import { apiEntry } from "../../pages/register/register";
import Loader from "../../components/spinner";
import toast from "react-hot-toast";

export default function Pricing({ plan, setPlan }) {
  const navigate = useNavigate();

  const [pricingPlans, setPricingPlans] = useState([]);
  const [plansLoaded, setPlansLoaded] = useState(false);

  useEffect(() => {
    fetch(`${apiEntry}/users/getplans`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPricingPlans(data.result);
          setPlansLoaded(true);
        } else {
          toast.error(data.result);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  if (!plansLoaded) {
    return (
      <div className="pricing-loader">
        <Loader />
      </div>
    );
  }

  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-title">
        Flexible Pricing
      </h2>

      <p className="pricing-sub">
        Choose the plan that matches your earning
        goals
      </p>

      <div className="pricing-grid">
        {pricingPlans.map((currentPlan, index) => {
          return (
            <div
              key={currentPlan._id || index}
              onClick={() =>
                setPlan(
                  currentPlan.name.toLowerCase()
                )
              }
              className={`pricing-card ${
                currentPlan.name.toLowerCase() ===
                plan
                  ? "popular"
                  : ""
              }`}
            >
              <h3>{currentPlan.name}</h3>

              <p className="desc">
                {currentPlan.description}
              </p>

              <div className="price">
                ${currentPlan.price.start} - $
                {currentPlan.price.end}
              </div>

              <button
                className="plan-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/register");
                }}
              >
                Start Plan
              </button>

              <ul>
                <li>
                  ✓{" "}
                  {
                    currentPlan.durationInHours
                  }
                  hrs plan
                </li>

                <li>
                  ✓ {currentPlan.ROI}% ROI
                </li>

                {currentPlan.features.map(
                  (feature, index) => (
                    <li key={index}>
                      ✓ {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}