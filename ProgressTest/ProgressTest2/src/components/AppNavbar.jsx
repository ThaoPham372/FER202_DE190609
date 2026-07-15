import { Button, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="border-bottom" style={{ backgroundColor: '#fff', padding: '0.8rem 1rem' }}>
            <Container fluid>
                <Navbar.Brand className="fw-bold d-flex align-items-center gap-2" style={{ color: '#2c3e50', fontSize: '1.25rem' }}>
                    <img src="/images/logo.png" alt="logo" style={{ height: '24px' }} />
                    PersonalBudget
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-responsive" />
                <Navbar.Collapse id="navbar-responsive" className="justify-content-end">
                    <div className="d-flex align-items-center gap-3">
                        {user && (
                            <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Signed in as <strong className="text-dark">{user.fullName || user.username}</strong>
                            </span>
                        )}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleLogout}
                            style={{ padding: '0.3rem 1rem', fontSize: '0.9rem', borderRadius: '4px' }}
                        >
                            Logout
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
