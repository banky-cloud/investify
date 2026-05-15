import { Navbar as BSNavbar, Container, Form, FormControl } from "react-bootstrap";

export default function Navbar({ title }) {
  return (
    <BSNavbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <BSNavbar.Brand>{title}</BSNavbar.Brand>

        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
          />
        </Form>
      </Container>
    </BSNavbar>
  );
}