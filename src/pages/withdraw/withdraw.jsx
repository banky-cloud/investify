import {apiEntry} from "../register/register"
import { useEffect, useState } from "react";
import Navbar from "./components/navbar"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/spinner";

export default function Withdraw() {
  const [coin, setCoin] = useState("BTC");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [balance,setBalance]=useState("loading");
  const [balanceLoaded,setBalanceLoaded]=useState(false);
  const [submitting,setSubmitting]=useState(false)
  const token = localStorage.getItem("investify_token")
  const navigate= useNavigate()
  useEffect(()=>{
    fetch(`${apiEntry}/users/token`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token
      }

    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)

      if(data.success){
        setBalance(data.result.balance)
        setBalanceLoaded(true)
      }
      else{
        toast.error("Failed to load balance")
      }
    })
    .catch(err=>{
      {
      console.log(err.message)
      
    }
    })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!address) return setError("Wallet address is required.");
    if (!network) return setError("Network is required.");
    if (!amount || Number(amount) <= 0)
      return setError("Enter a valid amount.");
    if (Number(amount) > balance)
      return setError("Insufficient balance.");

    setSubmitting(true)
     fetch(`${apiEntry}/transactions/withdraw`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token
      },
      body:JSON.stringify({address,network,amount,coin})
     })
     .then(res=>res.json())
     .then(data=>{
      console.log(data)
     })
      
  };

  return (
    <>
    <Navbar/>
    <div

style={{
  minHeight: "100vh",
  background: "#0f172a",
  color: "#fff",
  display: "flex",
  alignItems: "center",
}}
>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card
              className="shadow-lg border-0"
              style={{
                background: "#1e293b",
                borderRadius: "16px",
              }}
            >
              <Card.Body className="p-4">
                <h4 className="mb-4 text-center">Withdraw Crypto</h4>

                {error && <Alert variant="danger">{error}</Alert>}

                {/* Balance */}
                <div
                  className="mb-4 p-3 rounded"
                  style={{ background: "#0f172a" }}
                >
                  <small className="text-secondary">
                    Available Balance
                  </small>
                  <h3  className="mb-0 text-light">
                    {balanceLoaded?<p>$ {balance}</p>:<Loader/>} 
                  </h3>
                </div>

                <Form onSubmit={handleSubmit}>
                  {/* Coin */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Select Cryptocurrency
                    </Form.Label>
                    <Form.Select
                      value={coin}
                      onChange={(e) => setCoin(e.target.value)}
                      className="bg-dark text-light border-secondary"
                    >
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDT">Tether (USDT)</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Address */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Recipient Wallet Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-dark text-light border-secondary"
                    />
                    <small className="text-secondary">
                      Enter the destination wallet address carefully.
                    </small>
                  </Form.Group>

                  {/* Network */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Network (e.g. ERC20, TRC20, BEP20)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      className="bg-dark text-light border-secondary"
                    />
                    <small className="text-secondary">
                      Network (e.g. ERC20, TRC20, BEP20)
                      
                    </small>
                  </Form.Group>

                  {/* Amount */}
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Withdrawal Amount ({coin})
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-dark text-light border-secondary"
                        />

                      <Button
                        variant="outline-light"
                        onClick={() => setAmount(balance)}
                      >
                        Max
                      </Button>

                      <InputGroup.Text className="bg-dark text-light border-secondary">
                        {coin}
                      </InputGroup.Text>
                    </InputGroup>

                    <small className="text-secondary">
                      Maximum you can withdraw: {balance} {coin}
                    </small>
                  </Form.Group>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      background:
                      "linear-gradient(135deg, #3b82f6, #6366f1)",
                      border: "none",
                      padding: "10px",
                      fontWeight: "600",
                    }}
                    >
                    Submit Withdrawal
                    {submitting&&< Loader    style={{marginLeft:"8px", height:"1rem", width:"1rem"}}/>}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <p className="text-center mt-3 text-secondary">
              Always verify address and network before confirming.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
                    </>
  );
}