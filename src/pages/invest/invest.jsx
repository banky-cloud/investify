import { useEffect, useState } from "react";
import Pricing from "../../components/pricing/pricing";
import { apiEntry } from "../register/register";
import { useNavigate } from "react-router-dom";
import "./invest.css";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";
import Loader from "../../components/spinner";
import ErrorModal from "../../components/errormodal";

export default function InvestmentPage() {
  const navigate = useNavigate();

  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);

  const [errors, setErrors] = useState([]);

  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const [plansLoaded, setPlansLoaded] =
    useState(false);

  const [balanceFetched, setBalanceFetched] =
    useState(false);

  const token =
    localStorage.getItem("investify_token");

  const currentPlan = plans.find(
    (x) => x.name.toLowerCase() === plan
  );

  useEffect(() => {
    if (!token) {
      toast.error(
        "Session expired, please login again"
      );

      navigate("/login");

      return;
    }

    fetch(`${apiEntry}/users/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          toast.error(
            "Session expired please login"
          );

          navigate("/login");
        } else {
          setBalance(data.result.balance);
          setBalanceFetched(true);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });

    fetch(`${apiEntry}/users/getplans`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPlans(data.result);
          setPlansLoaded(true);
        } else {
          toast.error(data.result);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const handleInvest = () => {
    const tempErrors = [];

    if (!currentPlan) {
      tempErrors.push(
        "Please select a plan to continue"
      );
    }

    if (!amount) {
      tempErrors.push(
        "Please input amount to continue"
      );
    }

    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      tempErrors.push(
        "Please enter a valid amount"
      );
    }

    if (currentPlan) {
      const { price } = currentPlan;

      const priceHasAnEnd = Boolean(
        Number(price.end)
      );

      if (numericAmount > balance) {
        tempErrors.push("Insufficient funds");
      }

      if (numericAmount < price.start) {
        tempErrors.push(
          "Amount is too low for selected plan"
        );
      }

      if (
        priceHasAnEnd &&
        numericAmount > price.end
      ) {
        tempErrors.push(
          "Amount is too high for current plan"
        );
      }
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);

    fetch(`${apiEntry}/transactions/invest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        amount: numericAmount,
        plan: currentPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.success) {
          toast.success(data.result);

          navigate("/dashboard");
        } else {
          toast.error(
            data.result ||
              "Transaction failed"
          );
        }
      })
      .catch((error) => {
        setLoading(false);

        console.log(error.message);

        toast.error(
          "An error occurred while processing your request"
        );
      });
  };

  if (!plansLoaded || !balanceFetched) {
    return (
      <div className="investment-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="investment-con">
      <ErrorModal
        show={errors.length > 0}
        errors={errors}
        setErrors={setErrors}
      />

      <div className="investment-balance"></div>

      <Pricing
        plan={plan}
        setPlan={setPlan}
        pricingPlans={plans}
      />

      <div className="invest-inp-and-btn">
        <p className="text-light">
          Current Balance: {balance}
        </p>

        <input
          placeholder="Amount"
          className="form-control mb-4 bg-dark text-light"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <Button
          disabled={loading}
          onClick={handleInvest}
          className="w-100"
        >
          {loading ? (
            <>
              Processing...
              <Loader
                style={{
                  width: "1rem",
                  height: "1rem",
                }}
              />
            </>
          ) : (
            "Invest"
          )}
        </Button>
      </div>
    </div>
  );
}