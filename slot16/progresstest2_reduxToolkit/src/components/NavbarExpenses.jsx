import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
function NavbarExpenses() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate(); //Sử dụng useNavigate để điều hướng sau khi đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="/images/logo.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Personal Budget
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated && (
              <>
                <Navbar.Text className="me-3">
                  Signed in as <strong>{user?.fullName}</strong>
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarExpenses;
