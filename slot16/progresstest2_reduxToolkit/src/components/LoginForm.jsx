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

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../redux/slices/authSlice';
import ModalConfirm from './ModalConfirm';

function LoginForm() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Lấy navigate từ react-router-dom để chuyển hướng sau khi đăng nhập thành công
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  //Tạo 1 state cho lỗi
  const [errors, setError] = useState({ message: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    //Xử lý lỗi cơ bản trước khi gọi API (ví dụ: kiểm tra rỗng)
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return; // Nếu có lỗi, không tiếp tục gọi API
    }
    const action = await dispatch(loginThunk({ username, password }));
    if (loginThunk.fulfilled.match(action)) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 3000);
      return;
    }

    // rejected
    setError({ message: action.payload || 'Đăng nhập thất bại' });
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
  };

  // Hàm tiện ích để xử lý thay đổi input và xóa lỗi tương ứng khi người dùng nhập lại
  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setError((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {/* Hiển thị thông báo lỗi nếu có từ global state */}
              {error || errors.message ? (
                <Alert variant="danger">{error || errors.message}</Alert>
              ) : null}

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="identifier" className="mb-3" noValidate>
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username or email"
                    value={username}
                    onChange={handleInputChange(setUsername, 'username')}
                    disabled={loading}
                    isInvalid={!!errors.username} // Chỉ kiểm tra lỗi cục bộ
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username} {/* Chỉ hiển thị lỗi cục bộ */}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handleInputChange(setPassword, 'password')}
                    placeholder="Enter password"
                    disabled={loading}
                    isInvalid={!!errors.password} // Chỉ kiểm tra lỗi cục bộ
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password} {/* Chỉ hiển thị lỗi cục bộ */}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2 mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="flex-fill"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-fill"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Modal xác nhận đăng nhập thành công */}
      <ModalConfirm
        show={showModal}
        title="Login Successful"
        message="You have successfully logged in. Redirecting to dashboard..."
        onConfirm={() => setShowModal(false)} // Đóng modal khi người dùng nhấn Confirm
        onCancel={() => setShowModal(false)} // Đóng modal khi người dùng nhấn Cancel hoặc đóng modal
      />
    </Container>
  );
}

export default LoginForm;
