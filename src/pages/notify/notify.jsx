import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/spinner";
import { apiEntry } from "../register/register";
import toast from "react-hot-toast";

function NotifyUser() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading]= useState(false)
  const location=useLocation()
  const id= location.pathname.split("/")[2]
  console.log({id})
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend request goes here
      console.log(formData);
      setLoading(true);
      const token=localStorage.getItem("investify_token")
      fetch(`${apiEntry}/users/notify/${id}`,{
        method:"Post",
        headers:{
            "Content-Type":"application/json",
            token
        },
        body:JSON.stringify(formData)
      })
      .then(res=>res.json())
      .then(data=>{
        setLoading(false)
        if(data.success){
            toast.success(data.result)
        }
        else{
            toast.error(data.result)
        }
      })
      .catch(err=>{
        setLoading(false)
        toast.error(err.message)
      })

      setSuccess("Notification sent successfully.");

      setFormData({
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send notification.");
    }
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
            to="/admin/dashboard"
            className="fw-bold"
          >
            Investify Admin
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="admin-navbar" />

          <Navbar.Collapse id="admin-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin/dashboard">
                Dashboard
              </Nav.Link>

              <Nav.Link as={Link} to="/admin/users">
                Users
              </Nav.Link>

              <Nav.Link as={Link} to="/admin/transactions">
                Transactions
              </Nav.Link>

              <Nav.Link as={Link} to="/home">
                Exit Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* PAGE */}
      <Container
        className="d-flex justify-content-center align-items-center py-5"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card
              bg="dark"
              text="light"
              className="shadow-lg border-secondary p-4"
              style={{
                borderRadius: "18px",
              }}
            >
              <Card.Body>
                <h2 className="fw-bold text-center mb-3">
                  Notify User
                </h2>

                <p
                  className="text-center text-light mb-4"
                  style={{ fontSize: "0.95rem" }}
                >
                  Send notifications, updates, announcements,
                  or important account information directly to
                  a user.
                </p>

                {success && (
                  <Alert variant="success">
                    {success}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  
               

                  {/* SUBJECT */}
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>

                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Enter email subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        border: "1px solid #444",
                        padding: "12px",
                      }}
                    />
                  </Form.Group>

                  {/* MESSAGE */}
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={7}
                      name="message"
                      placeholder="Write your message to the user..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        border: "1px solid #444",
                        padding: "12px",
                        resize: "none",
                      }}
                    />
                  </Form.Group>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 py-2 fw-bold"
                    disabled={loading}
                  >
                    Send Notification {loading&&<Loader/>}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotifyUser;