import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function ExerciseNavBar({ activeKey, onChange }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>useContext Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="exercise-nav" />
        <Navbar.Collapse id="exercise-nav">
          <Nav className="ms-auto" activeKey={activeKey} onSelect={onChange}>
            <Nav.Link eventKey="ex1">Exercise 1: Theme</Nav.Link>
            <Nav.Link eventKey="ex2">Exercise 2: Auth</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ExerciseNavBar;

