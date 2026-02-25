import React, { useReducer, useState } from 'react';
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap';
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

  const handleLogout = () => {
    setShowSuccessModal(false);
    logout();
  };

  if (isAuthenticated && user) {
    return (
      <>
        <Card className="mb-4 text-start">
          <Card.Body>
            <h4 className="mb-2">Welcome, {user.username}!</h4>
            <p className="mb-1">Email: {user.email}</p>
            <p className="mb-3">
              Role: <strong>{user.role}</strong> | Status: {user.status}
            </p>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Card.Body>
        </Card>

        <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are logged in as:</p>
            <ul className="mb-0">
              <li>
                <strong>Username:</strong> {user.username}
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>Role:</strong> {user.role}
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <Card className="mb-4 text-start">
      <Card.Body>
        <h3 className="mb-3">Admin Login</h3>
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
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          {authError && (
            <Alert variant="danger" className="mb-3">
              {authError}
            </Alert>
          )}

          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;

