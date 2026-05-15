import { useEffect, useState } from "react";
import "./editPlans.css";
import Loader from "../../components/spinner";
import { apiEntry } from "../register/register";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [plansLoaded, setPlansLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [settingPlan, setSettingPlan] = useState(false);
    const navigate= useNavigate()


  const token = localStorage.getItem("investify_token");

  const selectedPlan = plans[selectedIndex];

  useEffect(() => {
    fetch(`${apiEntry}/users/getplans`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPlans(data.result);
          setPlansLoaded(true);
          toast.success("Plans fetched successfully");
        } else {
          toast.error(data.result);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const updatePlanField = (field, value) => {
    const updatedPlans = [...plans];

    updatedPlans[selectedIndex] = {
      ...updatedPlans[selectedIndex],
      [field]: value,
    };

    setPlans(updatedPlans);
  };

  const updatePriceField = (field, value) => {
    const updatedPlans = [...plans];

    updatedPlans[selectedIndex] = {
      ...updatedPlans[selectedIndex],
      price: {
        ...updatedPlans[selectedIndex].price,
        [field]: value,
      },
    };

    setPlans(updatedPlans);
  };

  const updateFeature = (index, value) => {
    const updatedPlans = [...plans];

    updatedPlans[selectedIndex].features[index] = value;

    setPlans(updatedPlans);
  };

  const addFeature = () => {
    const updatedPlans = [...plans];

    updatedPlans[selectedIndex].features.push("");

    setPlans(updatedPlans);
  };

  const removeFeature = (index) => {
    const updatedPlans = [...plans];

    updatedPlans[selectedIndex].features.splice(index, 1);

    setPlans(updatedPlans);
  };

  const savePlan = () => {
    setSettingPlan(true);

    fetch(`${apiEntry}/users/editPlan/${selectedPlan._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(selectedPlan),
    })
      .then((res) => res.json())
      .then((data) => {
        setSettingPlan(false);

        if (data.success) {
          toast.success(data.result);
          navigate(0)
          
        } else {
          toast.error(data.result);
        }
      })
      .catch((err) => {
        setSettingPlan(false);
        toast.error(err.message);
      });
  };

  if (!plansLoaded) {
    return (
      <div style={{width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }} className="plans-loader bg-light">
        <Loader style={{color:"black"}} />
      </div>
    );
  }

  return (
    <div className="admin-plans-page">
      {/* LEFT SIDE */}
      <div className="editor-panel">
        <h2>Plan Editor</h2>

        <div className="plan-tabs">
          {plans.map((plan, index) => (
            <button
              key={plan._id || index}
              className={selectedIndex === index ? "active-tab" : ""}
              onClick={() => setSelectedIndex(index)}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {selectedPlan && (
          <>
            <div className="form-group">
              <label>Plan Name</label>

              <input
                type="text"
                value={selectedPlan.name}
                onChange={(e) =>
                  updatePlanField("name", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <input
                type="text"
                value={selectedPlan.description}
                onChange={(e) =>
                  updatePlanField("description", e.target.value)
                }
              />
            </div>

            <div className="double-input">
              <div className="form-group">
                <label>Starting Price</label>

                <input
                  type="text"
                  value={selectedPlan.price.start}
                  onChange={(e) =>
                    updatePriceField("start", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Ending Price</label>

                <input
                  type="text"
                  value={selectedPlan.price.end}
                  onChange={(e) =>
                    updatePriceField("end", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="double-input">
              <div className="form-group">
                <label>Duration (Hours)</label>

                <input
                  type="number"
                  value={selectedPlan.durationInHours}
                  onChange={(e) =>
                    updatePlanField(
                      "durationInHours",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>ROI (%)</label>

                <input
                  type="number"
                  value={selectedPlan.ROI}
                  onChange={(e) =>
                    updatePlanField("ROI", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="features-section">
              <div className="feature-top">
                <label>Features</label>

                <button onClick={addFeature}>
                  + Add
                </button>
              </div>

              {selectedPlan.features.map((feature, index) => (
                <div className="feature-input" key={index}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      updateFeature(index, e.target.value)
                    }
                  />

                  <button
                    onClick={() => removeFeature(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              disabled={settingPlan}
              className="save-btn"
              onClick={savePlan}
            >
              {settingPlan ? (
                <>
                  Saving...
                  <Loader
                    style={{
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                </>
              ) : (
                "Save Plan"
              )}
            </button>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      {selectedPlan && (
        <div className="preview-panel">
          <h2>Live Preview</h2>

          <div className="pricing-card popular">
            <h3>{selectedPlan.name}</h3>

            <p className="desc">
              {selectedPlan.description}
            </p>

            <div className="price">
              ${selectedPlan.price.start} - $
              {selectedPlan.price.end}
            </div>

            <button className="plan-btn">
              Start Plan
            </button>

            <ul>
              <li>
                ✓ {selectedPlan.durationInHours}hrs
                plan
              </li>

              <li>
                ✓ {selectedPlan.ROI}% ROI
              </li>

              {selectedPlan.features.map(
                (feature, index) => (
                  <li key={index}>✓ {feature}</li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}