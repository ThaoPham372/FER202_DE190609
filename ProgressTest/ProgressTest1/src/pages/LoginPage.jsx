import { useState } from 'react';
import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MessageModal from '../components/MessageModal';
import { useAuth } from '../contexts/AuthContext';
import { getAccounts } from '../services/accountService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loggedAccount, setLoggedAccount] = useState(null);

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = 'Username or Email is required.';
    if (!password.trim()) errs.password = 'Password is required.';
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMsg('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const accounts = await getAccounts();
      const account = accounts.find(
        (a) =>
          (a.username === username.trim() || a.email === username.trim()) &&
          a.password === password
      );

      if (!account) {
        setAlertMsg('Invalid username/email or password!');
        return;
      }
      if (account.role !== 'admin') {
        setAlertMsg('Access denied. Only admin users can log in.');
        return;
      }
      if (account.status === 'locked') {
        setAlertMsg('Account is locked. Please contact admin.');
        return;
      }

      setLoggedAccount(account);
      setShowModal(true);
    } catch {
      setAlertMsg('Server error. Please try again later.');
    }
  };

  const handleContinue = () => {
    login(loggedAccount);
    setShowModal(false);
    navigate('/accounts');
  };

  return (
    <div className="login-wrapper">
      <Card className="login-card">
        <Card.Header className="text-center">
          <h4 className="mb-0 py-1">Login</h4>
        </Card.Header>

        <Card.Body>
          {alertMsg && (
            <Alert variant="danger" dismissible onClose={() => setAlertMsg('')}>
              {alertMsg}
            </Alert>
          )}

          <Form onSubmit={handleLogin} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Username or email</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!errors.username}
                />
                <InputGroup.Text className={errors.username ? 'border-danger' : ''}>
                  <span style={{ color: errors.username ? '#dc3545' : '#adb5bd' }}>ⓘ</span>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <InputGroup.Text className={errors.password ? 'border-danger' : ''}>
                  <span style={{ color: errors.password ? '#dc3545' : '#adb5bd' }}>ⓘ</span>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-fill fw-semibold">
                Login
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="flex-fill fw-semibold"
                onClick={() => {
                  setUsername('');
                  setPassword('');
                  setErrors({});
                  setAlertMsg('');
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>

        <Card.Footer className="text-center">
          <Link to="/register">Don&apos;t have an account? Sign up.</Link>
        </Card.Footer>
      </Card>

      <MessageModal
        show={showModal}
        username={loggedAccount?.username}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default LoginPage;
