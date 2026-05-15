import { useEffect } from "react";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiEntry } from "../../register/register";
export default function Sidebar({ show, onHide }) {
  const navigate=useNavigate()
 
  return (
    <>
      {/* Mobile Sidebar */}
      <Offcanvas show={show} onHide={onHide} className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link>Dashboard</Nav.Link>
            <Nav.Link>Users</Nav.Link>
            <Nav.Link>Transactions</Nav.Link>
            <Nav.Link as={Link} to="/editPlans">Edit Plans</Nav.Link>
            <Nav.Link as={Link} to="/editWallets">Edit Wallets</Nav.Link>


            <Button onClick={()=>{
              const logout= window.confirm("Are you sure you want to log out?");
              if(logout){
                localStorage.removeItem("investify_token");
                navigate("/login")
              }
            }}>Logout</Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Desktop Sidebar */}
      <div
        className="d-none d-lg-block"
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "#fff",
          borderRight: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <h5>Dashboard</h5>

        <Nav className="flex-column mt-4">
          <Nav.Link>Dashboard</Nav.Link>
          <Nav.Link>Users</Nav.Link>
          <Nav.Link>Transactions</Nav.Link>
            <Nav.Link as={Link} to="/editPlans">Edit Plans</Nav.Link>
            <Nav.Link as={Link} to="/editWallets">Edit Wallets</Nav.Link>


          
            <Button onClick={()=>{
              const logout= window.confirm("Are you sure you want to log out?");
              if(logout){
                localStorage.removeItem("investify_token");
                navigate("/login")
              }
            }}>Logout</Button>
        </Nav>
      </div>
    </>
  );
}