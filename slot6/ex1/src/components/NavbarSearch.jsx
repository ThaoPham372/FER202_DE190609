import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import '../App.css'

const AdminNavbar = () => {
  const location = useLocation()

  return (
    <Navbar bg="white" expand="lg" className="px-3 admin-navbar shadow-sm">
      <Container fluid style={{ maxWidth: '1200px' }}>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold admin-brand"
        >
          Flight Booking System 
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link
              as={Link}
              to="/booking"
              className={`admin-nav-link ${
                location.pathname === '/booking' ? 'active' : ''
              }`}
            >
              Booking
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/users"
              className={`admin-nav-link ${
                location.pathname === '/users' ? 'active' : ''
              }`}
            >
              User Management
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              className={`admin-nav-link ${
                location.pathname === '/login' ? 'active' : ''
              }`}
            >
              Login
            </Nav.Link>
          </Nav>

          <div className="admin-nav-right">
            <span className="admin-nav-user">Admin</span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar

