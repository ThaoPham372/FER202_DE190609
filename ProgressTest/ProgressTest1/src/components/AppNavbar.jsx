import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-0 app-navbar">
      <Container>
        <Navbar.Brand as={Link} to={user ? '/accounts' : '/login'}>
          <span className="app-navbar-logo">Account Manager</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          {user ? (
            <div className="d-flex align-items-center gap-3 app-navbar-user">
              <Image
                src={user.avatar}
                roundedCircle
                width={34}
                height={34}
                className="app-navbar-avatar"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/34';
                }}
              />
              <div className="d-flex flex-column me-1 text-end">
                <span className="app-navbar-username">{user.username}</span>
                <span className="app-navbar-role text-uppercase">
                  {user.role}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline-light"
                className="fw-semibold px-3"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

