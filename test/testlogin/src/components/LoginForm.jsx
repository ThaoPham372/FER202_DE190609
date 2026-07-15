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
import { useAuth } from '../contexts/AuthContext';
import { loginAction } from '../services/AuthAPI';

function LoginForm() {
  const [identifier, setIdentifier] = useState(''); // Ô dùng chung cho username/email
  const [password, setPassword] = useState('');
  const [errors, setLocalErrors] = useState({});
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // validate từng field
    if (!identifier) {
      newErrors.identifier = 'Username or Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    // nếu có bất kỳ lỗi nào thì dừng lại
    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    const result = await loginAction(dispatch, { identifier, password });
    if (result.success) {
      alert('Login successful!');
      navigate('/home');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm p-4">
            <h2 className="text-center mb-4">Login</h2>
            {(state.error || errors.auth) && (
              <Alert variant="danger">{state.error || errors.auth}</Alert>
            )}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username or email"
                  value={identifier}
                  isInvalid={!!errors.identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.identifier}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  isInvalid={!!errors.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={state.loading}
              >
                {state.loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
