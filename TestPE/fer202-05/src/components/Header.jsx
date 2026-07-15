import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    /* Dùng variant="dark" và class bg-primary để có màu xanh đẹp */
    <Navbar variant="dark" bg="primary" expand="lg" className="shadow-sm py-3">
      <Container>
        {/* LOGO & Tên cửa hàng */}
        <Navbar.Brand as={Link} to="/home" className="fw-bold fs-4">
          <img src="/img/logo.png" width="30" height="30" className="me-2" alt="logo" />
          FreshFood Mart
        </Navbar.Brand>

        {/* 2 Link Home và Store */}
        <Nav className="me-auto ms-4">
          <Nav.Link as={Link} to="/home" className="text-white mx-2">Home</Nav.Link>
          <Nav.Link as={Link} to="/store" className="text-white mx-2">Store</Nav.Link>
        </Nav>

        {/* Nút Login nằm bên phải */}
        <Button variant="outline-light" as={Link} to="/login" className="px-4">Login</Button>
      </Container>
    </Navbar>
  );
}

export default Header;
