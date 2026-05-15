import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("investify_token");
    navigate("/home");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ background: "#020617" }}
      className="shadow-sm"
    >
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/dashboard">
          Investify
        </Navbar.Brand>

        {/* Hamburger */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* Left links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
          </Nav>

          {/* Right side */}
          <Nav>
            <Button
              variant="outline-light"
              onClick={handleLogout}
              className="ms-lg-3"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}