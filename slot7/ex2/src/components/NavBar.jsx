import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">React Exercises</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/exercise1" active={location.pathname === '/exercise1'}>
              Exercise 1
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise2" active={location.pathname === '/exercise2'}>
              Exercise 2
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise3" active={location.pathname === '/exercise3'}>
              Exercise 3
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise4" active={location.pathname === '/exercise4'}>
              Exercise 4
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise5" active={location.pathname === '/exercise5'}>
              Exercise 5
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise6" active={location.pathname === '/exercise6'}>
              Exercise 6
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise7" active={location.pathname === '/exercise7'}>
              Exercise 7
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise8" active={location.pathname === '/exercise8'}>
              Exercise 8
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
