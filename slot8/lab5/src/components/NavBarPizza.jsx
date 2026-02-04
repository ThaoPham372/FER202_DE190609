import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBarPizza() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4 shadow">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Pizza Order App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/news">
              News
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              Đăng Ký Form
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarPizza;

