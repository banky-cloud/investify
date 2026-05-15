import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {apiEntry} from "../register/register"
import Loader from "../../components/spinner";
import toast from "react-hot-toast";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading]= useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend handles sending reset email
    setLoading(true)
    console.log("Reset link requested for:", email);
    fetch(`${apiEntry}/users/forgot-password`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email
        })
    })
    .then(res=>res.json())
    .then(data=>{
        setLoading(false)
        if(data.success){
                toast.success(data.result)
        }else{
            toast.error(data.result)
        }
    })
    .catch(err=>{
        toast.error(err.message)
        setLoading(false)
    })
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* NAVBAR */}
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="shadow-sm py-3"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-info"
          >
            Investify
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* FORGOT PASSWORD SECTION */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <Card
          bg="dark"
          text="light"
          className="p-4 shadow-lg border-secondary"
          style={{
            width: "100%",
            maxWidth: "450px",
            borderRadius: "15px",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-3 fw-bold">
              Forgot Password
            </h2>

            <p
              className="text-center text-light mb-4"
              style={{ fontSize: "0.95rem" }}
            >
              Enter your email address and we'll send you a password
              reset link. Check your inbox or spam folder for reset
              instructions.
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    border: "1px solid #444",
                    padding: "12px",
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 py-2 fw-bold"
                disabled={loading}
              >
                Send Reset Link {loading&&<Loader/>}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ForgotPassword;