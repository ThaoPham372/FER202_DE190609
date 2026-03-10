import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal'; // [1] Đảm bảo đường dẫn này đúng
import { useAuth } from '../contexts/AuthContext';
import { loginAction } from '../services/AuthAPI';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setLocalErrors] = useState({});
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  // State điều khiển Modal thành công
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Bước 1: Check rỗng
    if (!username || !password) {
      newErrors.auth = 'Username and password are required';
      setLocalErrors(newErrors);
      return;
    }

    // Bước 2: Check độ dài password
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      setLocalErrors(newErrors);
      return;
    }

    // Gọi API Login
    const result = await loginAction(dispatch, { username, password });

    if (result.success) {
      // [2] Mở Modal thay vì dùng alert()
      setShowSuccessModal(true);
    }
  };

  // Hàm xử lý khi nhấn OK trên Modal thành công
  const handleSuccessOk = () => {
    setShowSuccessModal(false);
    navigate('/home');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm p-4 border-0">
            <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>

            {/* Alert báo lỗi chung (sai tài khoản hoặc để trống) */}
            {(state.error || errors.auth) && (
              <Alert variant="danger" className="text-center py-2">
                {state.error || errors.auth}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setLocalErrors({});
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  isInvalid={!!errors.password} // Hiện khung đỏ nếu lỗi độ dài
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalErrors({});
                  }}
                />
                {/* Chữ báo lỗi đỏ dưới khung */}
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  (at least 6 characters)
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-bold mt-2"
                disabled={state.loading}
              >
                {state.loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* [3] TÁI SỬ DỤNG CONFIRM MODAL CHO THÔNG BÁO THÀNH CÔNG */}
      <ConfirmModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        onConfirm={handleSuccessOk}
        title="Login Status"
        message="Login successful! Welcome back to PersonalBudget."
        type="success" // [QUAN TRỌNG]: Để modal tự ẩn nút Cancel
      />
    </Container>
  );
}

export default LoginForm;
