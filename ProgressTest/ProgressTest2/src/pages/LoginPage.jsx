import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUsers } from '../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [pwdError, setPwdError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setAlertMsg('');
        setPwdError('');

        if (!username || !password) {
            setAlertMsg('Username and password are required');
            return;
        }
        if (password.length < 6) {
            setPwdError('Password must be at least 6 characters');
            return;
        }

        try {
            const users = await getUsers();
            const account = users.find(u => u.username === username && u.password === password);
            if (!account) {
                setAlertMsg('Invalid username or password');
            } else {
                login(account);
                navigate('/home');
            }
        } catch {
            setAlertMsg('Server connect error!');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfcfc' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid #dee2e6', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h2 className="text-center mb-4 pb-2 fw-semibold" style={{ color: '#2c3e50' }}>Login</h2>

                {alertMsg && (
                    <Alert variant="danger" style={{ backgroundColor: '#f8d7da', color: '#842029', border: 'none', borderRadius: '4px' }}>
                        {alertMsg}
                    </Alert>
                )}

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#495057', fontSize: '0.95rem' }}>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ padding: '0.6rem 0.8rem' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ color: '#495057', fontSize: '0.95rem' }}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!pwdError}
                            style={{ padding: '0.6rem 0.8rem' }}
                        />
                        <Form.Control.Feedback type="invalid" style={{ fontSize: '0.85rem' }}>
                            {pwdError}
                        </Form.Control.Feedback>
                        <div className="mt-1" style={{ color: '#6c757d', fontSize: '0.85rem' }}>
                            (at least 6 characters)
                        </div>
                    </Form.Group>

                    <div className="d-flex gap-3">
                        <Button variant="primary" type="submit" className="flex-grow-1 fw-bold" style={{ backgroundColor: '#3b82f6', border: 'none', padding: '0.6rem' }}>
                            Login
                        </Button>
                        {pwdError !== '' && (
                            <Button variant="secondary" onClick={() => { setUsername(''); setPassword(''); setPwdError(''); setAlertMsg(''); }} className="fw-bold" style={{ backgroundColor: '#6c757d', border: 'none', padding: '0.6rem 1.5rem' }}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
