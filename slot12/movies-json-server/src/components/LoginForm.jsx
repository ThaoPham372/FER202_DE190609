import React, { useReducer, useState } from 'react';
import { Alert, Button, Card, Container, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const initialFormState = {
  username: '',
  password: '',
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case 'field_change':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };
    case 'set_errors':
      return {
        ...state,
        errors: action.errors || {},
      };
    case 'reset':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { username, password, errors } = state;
  const { user, isAuthenticated, authError, login, logout } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!username.trim()) {
      nextErrors.username = 'Username is required.';
    }
    if (!password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      dispatch({ type: 'set_errors', errors: nextErrors });
      return;
    }

    const ok = login(username.trim(), password);
    if (ok) {
      dispatch({ type: 'reset' });
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  // Nếu đã đăng nhập, chỉ hiển thị modal thông báo ngắn gọn (App.js sẽ hiển thị MovieManager)
  if (isAuthenticated && user) {
    return (
      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn đã đăng nhập với tài khoản <strong>{user.username}</strong>.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fafc',
        padding: '24px',
      }}
    >
      <Container className="fade-in">
        <div style={{ maxWidth: '420px', margin: '0 auto' }}>
          <Card className="professional-card form-card">
            <Card.Body style={{ padding: '2rem 2.5rem' }}>
              <div className="text-center mb-4">
                <h2
                  className="mb-2"
                  style={{ fontSize: '1.9rem', fontWeight: 700, color: '#2d3748' }}
                >
                  🔐 Admin Login
                </h2>
                <p style={{ color: '#718096', fontSize: '0.95rem' }}>
                  Đăng nhập để quản lý hệ thống phim
                </p>
              </div>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) =>
                      dispatch({ type: 'field_change', field: 'username', value: e.target.value })
                    }
                    isInvalid={!!errors.username}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) =>
                      dispatch({ type: 'field_change', field: 'password', value: e.target.value })
                    }
                    isInvalid={!!errors.password}
                    placeholder="Nhập mật khẩu"
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                {authError && (
                  <Alert variant="danger" className="mb-3">
                    <strong>⚠️</strong> {authError}
                  </Alert>
                )}

                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg" className="btn-enhanced">
                    Đăng nhập
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default LoginForm;
