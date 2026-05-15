import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiEntry } from "../register/register";
import Loader from "../../components/spinner";
import toast from "react-hot-toast";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const navigate= useNavigate()
    const location= useLocation()
    const id=location.pathname.split("/")[2]
    console.log({id})
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwords.password !== passwords.confirmPassword) {
      return setError("Passwords do not match");
    }

    // Backend reset password logic here
    console.log("New Password:", passwords.password);
    setLoading(true)
    fetch(`${apiEntry}/users/resetpassword/${id}`,{
        method:"Post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({password:passwords.password})
    })
    .then(res=>res.json())
    .then(data=>{
        setLoading(false)
        if(data.success){
            toast.success(data.result)
            navigate("/login")
        }
        else{
            toast.error(data.result)
            navigate(0)
        }
    })
    .catch(err=>{
        setLoading(false)
        toast.error(err.message)
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
        bg="dark"
        variant="dark"
        expand="lg"
        className="shadow-sm py-3"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold "
          >
            Investify
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />

          <Navbar.Collapse id="navbar">
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

      {/* RESET PASSWORD CARD */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <Card
          bg="dark"
          text="light"
          className="shadow-lg border-secondary p-4"
          style={{
            width: "100%",
            maxWidth: "450px",
            borderRadius: "15px",
          }}
        >
          <Card.Body>
            <h2 className="text-center fw-bold mb-3">
              Reset Password
            </h2>

            <p
              className="text-center text-light mb-4"
              style={{ fontSize: "0.95rem" }}
            >
              Enter your new password below and confirm it to
              secure your Investify account.
            </p>

            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* PASSWORD */}
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  value={passwords.password}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    border: "1px solid #444",
                    padding: "12px",
                  }}
                />
              </Form.Group>

              {/* CONFIRM PASSWORD */}
              <Form.Group className="mb-3">
                <Form.Label>Retype Password</Form.Label>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Retype your password"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    border: "1px solid #444",
                    padding: "12px",
                  }}
                />
              </Form.Group>

              {/* SHOW PASSWORD */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  checked={showPassword}
                  onChange={() =>
                    setShowPassword(!showPassword)
                  }
                />
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className="w-100 py-2 fw-bold"
                disabled={loading}
              >
                Reset Password {loading&&<Loader style={{width:"1rem", height:"1rem"}}/>}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ResetPassword;