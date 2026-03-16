import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
function NavbarExpenses() {
  const { state, dispatch } = useAuth(); //Sử dụng useAuth để lấy thông tin xác thực và hàm dispatch từ AuthContext
  const navigate = useNavigate(); //Sử dụng useNavigate để điều hướng sau khi đăng xuất
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="/images/users/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Personal Budget
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {state.isAuthenticated && (
              <>
                <Navbar.Text className="me-3">
                  Signed in as <strong>{state.user.fullName}</strong>
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
