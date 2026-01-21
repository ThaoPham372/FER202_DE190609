import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../styles/pizzaHouse.css';

const PizzaHouseNavbar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 ph-navbar">
      <Container fluid style={{ maxWidth: '1200px' }}>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 ph-brand"
          style={{ fontFamily: 'serif', textDecoration: 'none' }}
        >
          🍕 Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link
              as={Link}
              to="/"
              className={`ph-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`ph-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={`ph-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Nav.Link>
          </Nav>

          <div className="ph-search">
            <input
              type="text"
              placeholder="Search our menu..."
              className="ph-search-input"
            />
            <button type="button" aria-label="Search" className="ph-search-btn">
              🔍
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PizzaHouseNavbar;

