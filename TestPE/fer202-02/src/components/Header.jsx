import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  // [NOTE]: Lấy state (để hiện tên) và dispatch (để thực hiện logout) từ AuthContext
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  // [NOTE]: Hàm xử lý đăng xuất chung cho mọi bài
  const handleLogout = () => {
    // 1. Xóa thông tin người dùng trong trạng thái chung (Global State)
    dispatch({ type: 'LOGOUT' });
    // 2. Đẩy người dùng về trang đăng nhập ngay lập tức
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom mb-4 shadow-sm">
      <Container>
        {/* [NOTE]: Thay tên ứng dụng theo đề bài tại đây  */}
        <Navbar.Brand className="fw-bold">PersonalBudget</Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          {/* [NOTE]: Dùng dấu ?. (Optional Chaining) để tránh lỗi nếu chưa có user  */}
          <Navbar.Text className="me-3">
            Signed in as: <strong>{state.user?.username}</strong>
          </Navbar.Text>

          {/* [NOTE]: Nút Logout luôn gọi hàm handleLogout đã định nghĩa  */}
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
