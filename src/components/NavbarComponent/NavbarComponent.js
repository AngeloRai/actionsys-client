import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import logo from '../../images/employees.png'

function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);

  function expand() {
    if (expanded === false) {
      setExpanded(true);
    } else if (expanded === true) setExpanded(false);
  }

  return (
    <Navbar
      collapseOnSelect
      expanded={expanded}
      expand="lg"
      style={{ backgroundColor: "#4a4343" }}
      variant="dark"
    >
      <Navbar.Brand to="/">
        <NavLink className="mx-4 navbar-brand" to="/">
        <img
            src={logo}
            alt="logo"
            className="d-inline-block align-top "
            style={{maxWidth: "6rem", borderRadius: "6px" }}
          />
          
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle
        onClick={expand}
        aria-controls="responsive-navbar-nav "
        className="mx-4"
      />
      <Navbar.Collapse id="responsive-navbar-nav d-flex justify-content-center text-center ">
        <Nav className="mr-auto">
          <NavLink
            onClick={() => setExpanded(false)}
            className="d-flex justify-content-center nav-link"
            activeClassName="active"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setExpanded(false)}
            className="d-flex justify-content-center nav-link"
            activeClassName="active"
            to="/funcionario/adicionar"
          >
            ADICIONAR FUNCIONARIO
          </NavLink>
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
