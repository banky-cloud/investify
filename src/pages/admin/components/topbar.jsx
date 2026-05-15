import { Navbar, Container, Button } from "react-bootstrap";

export default function Topbar({ onToggle }) {
  return (
    <Navbar bg="light" className="shadow-sm">
      <Container fluid>
        <Button
          variant="outline-primary"
          className="d-lg-none"
          onClick={onToggle}
        >
          ☰
        </Button>

        <Navbar.Brand className="ms-2">Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
}